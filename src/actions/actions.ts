export async function chatWithGroq({
  pdfText,
  conversationHistory,
  userInput,
}: {
  pdfText: string
  conversationHistory: string
  userInput: string
}) {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      throw new Error("GROQ_API_KEY environment variable is not set")
    }

    const systemPrompt = `You are an assistant that answers questions about a PDF document.`

    const userPrompt = `Previous conversation:
${conversationHistory}

User's question: ${userInput}

PDF content:
${pdfText}`
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const response = await fetch(`${apiBaseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Groq API error: ${response.status} - ${errorData.error?.message || "Unknown error"}`
      )
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content

    if (!text) {
      throw new Error("No response content from Groq API")
    }

    return { success: true, text }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred"
    console.error("Chat error:", error)
    return { success: false, error: errorMessage }
  }
}
