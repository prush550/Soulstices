"use server"

export interface FormData {
  name: string
  email: string
  city: string
  happiness: string
  expectations: string
}

// ✅ Replace with your deployed Google Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbywTWuoBfxm63_7EkWpM3G-Vwz6EwRo4g_DFE63ChGSMF5k2rl2U2GtjcxGtq5lETNFnw/exec"

export async function submitAboutForm(formData: FormData) {
  try {
    // --- Basic Validation ---
    if (!formData.name || !formData.email) {
      return {
        success: false,
        message: "Name and email are required fields.",
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // --- Send Data to Google Apps Script ---
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Google Script error: ${response.status} ${response.statusText}`)
    }

    let result: any = {}
    try {
      result = await response.json()
    } catch {
      throw new Error("Invalid JSON returned from Google Apps Script")
    }

    // --- Custom Response Messages ---
    let responseMessage =
      "Thank you for sharing your story with us! We'll be in touch soon."

    if (formData.happiness === "struggling" || formData.happiness === "not-happy") {
      responseMessage =
        "Thank you for trusting us with your story. We understand that things can be challenging, and we're here to support you. Someone from our community will reach out to you within 24 hours."
    } else if (formData.happiness === "very-happy" || formData.happiness === "mostly-happy") {
      responseMessage =
        "It's wonderful to hear that you're doing well! Thank you for sharing your story. We'd love to have you as part of our supportive community."
    }

    // --- Final Structured Response ---
    return {
      success: true,
      message: responseMessage,
      data: {
        name: formData.name,
        email: formData.email,
        ...result, // ✅ includes timestamp / row from Apps Script
        submittedAt: new Date().toISOString(),
      },
    }
  } catch (error: any) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      message:
        "There was an error submitting your form. Please try again later.",
    }
  }
}
