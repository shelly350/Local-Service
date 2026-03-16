document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("bizName").value.trim();
  const type = document.getElementById("bizType").value.trim();
  const zip = document.getElementById("bizZip").value.trim();
  const address = document.getElementById("bizAddress").value.trim();
  const desc = document.getElementById("description").value.trim();
  const file = document.getElementById("bizImage").files[0];

  if (!name || !type || !zip || !file) {
    alert("Please fill required fields and attach an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;

    const biz = {
      name,
      type,
      zip,
      address: address || "",
      desc,
      image: imageData,
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("services")) || [];
    existing.push(biz);
    localStorage.setItem("services", JSON.stringify(existing));

    alert("Business uploaded!");
    window.location.href = "index.html";
  };

  reader.readAsDataURL(file);
});
