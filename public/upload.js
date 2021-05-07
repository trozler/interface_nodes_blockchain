function mainEncoding() {
  const form = document.getElementById("form-upload");

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    createBase64EncodedImage(evt.target);

    return false;
  });

  function createBase64EncodedImage(formElement) {
    const reader = new FileReader();
    reader.onloadend = async function () {
      console.log("encoded image:", reader.result);
      console.log("email:", formElement["email"].value);

      await postData(reader.result, formElement["email"].value);
      window.location.reload();
    };

    reader.readAsDataURL(formElement["photo"].files[0]);
  }

  async function postData(data, email) {
    await fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: data, email: email }), // body data type must match "Content-Type" header
    });
  }
}

window.addEventListener("DOMContentLoaded", mainEncoding);
