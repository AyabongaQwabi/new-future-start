// Fetch and analyze the promo codes CSV structure
async function analyzePromoStructure() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/promo_codes_rows-4NZvcHLC7VtiEABt7uuEpwFy22y8E4.csv",
    )
    const csvText = await response.text()

    console.log("CSV Content:")
    console.log(csvText)

    // Parse CSV manually
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",")

    console.log("\nHeaders:", headers)

    // Parse each row
    const rows = lines.slice(1).map((line) => {
      const values = line.split(",")
      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })
      return row
    })

    console.log("\nSample rows:")
    rows.forEach((row, index) => {
      console.log(`Row ${index + 1}:`, row)
    })

    return { headers, rows }
  } catch (error) {
    console.error("Error fetching CSV:", error)
  }
}

analyzePromoStructure()
