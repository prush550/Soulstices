"use server"

export interface FormData {
  name: string
  email: string
  city: string
  happiness: string
  expectations: string
}

export async function submitAboutForm(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Here you would typically:
  // 1. Validate the data
  // 2. Save to database
  // 3. Send notification emails
  // 4. Add to mailing list, etc.

  // For now, we'll just log the submission
  console.log("Form submission received:", {
    name: formData.name,
    email: formData.email,
    city: formData.city,
    happiness: formData.happiness,
    expectations: formData.expectations,
    submittedAt: new Date().toISOString(),
  })

  // Basic validation
  if (!formData.name || !formData.email) {
    return {
      success: false,
      message: "Name and email are required fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Simulate different responses based on happiness level
  let responseMessage = "Thank you for sharing your story with us! We'll be in touch soon."

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
      name: formData.name,
      submittedAt: new Date().toISOString(),
    },
  }
}
