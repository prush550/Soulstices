"use server"

export interface FormData {
  name: string
  email: string
  city: string
  happiness: string
  expectations: string
}

// Replace this with your own Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxnxrNwV2Ds_25g_a48_MngWQZcDt3fi_2lcSTGIRgC0TUI83qSw8rdUIpS6HbmpWn_/exec"

export async function submitAboutForm(formData: FormData) {
  try {
    // Basic validation
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

    // Send form data to Google Apps Script endpoint
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Google Script error: ${response.statusText}`)
    }

    const result = await response.json()

    // Build a response message similar to your earlier logic
    let responseMessage =
      "Thank you for sharing your story with us! We'll be in touch soon."

    if (formData.happiness === "struggling" || formData.happiness === "not-happy") {
      responseMessage =
        "Thank you for trusting us with your story. We understand that things can be challenging, and we're here to support you. Someone from our community will reach out to you within 24 hours."
    } else if (formData.happiness === "very-happy" || formData.happiness === "mostly-happy") {
      responseMessage =
        "It's wonderful to hear that you're doing well! Thank you for sharing your story. We'd love to have you as part of our supportive community."
    }

    return {
      success: true,
      message: responseMessage,
      data: {
        ...result, // In case Apps Script returns data like timestamp or row number
        name: formData.name,
        submittedAt: new Date().toISOString(),
      },
    }
  } catch (error: any) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      message: "There was an error submitting your form. Please try again later.",
    }
  }
}
