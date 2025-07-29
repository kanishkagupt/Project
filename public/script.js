const baseUrl = "/bfhl";

async function submitData() {
  const input = document.getElementById("arrayInput").value;
  const arr = input.split(",").map(el => el.trim());
  const responseDiv = document.getElementById("responseCard");
  const errorDiv = document.getElementById("errorBox");

  responseDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  try {
    // GET user info
    const userInfoRes = await fetch(baseUrl);
    const userInfo = await userInfoRes.json();

    // POST data
    const postRes = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: arr })
    });
    const result = await postRes.json();

    responseDiv.innerHTML = `
      <strong>Status:</strong> ✅ Success<br>
      <strong>User ID:</strong> ${userInfo.user_id}<br>
      <strong>Email:</strong> ${userInfo.email}<br>
      <strong>Roll Number:</strong> ${userInfo.roll_number}<br>
      <strong>Even Numbers:</strong> ${JSON.stringify(result.even_numbers)}<br>
      <strong>Odd Numbers:</strong> ${JSON.stringify(result.odd_numbers)}<br>
      <strong>Alphabets:</strong> ${JSON.stringify(result.alphabets)}<br>
      <strong>Special Characters:</strong> ${JSON.stringify(result.special_characters)}<br>
      <strong>Sum:</strong> ${result.sum}<br>
      <strong>Concat String:</strong> ${result.concat_string}
    `;

    responseDiv.classList.remove("hidden");
  } catch (error) {
    errorDiv.innerText = " Error: " + error.message;
    errorDiv.classList.remove("hidden");
  }
}



