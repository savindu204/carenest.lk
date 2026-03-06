document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form");
  const emailInput = document.getElementById("waitlist-email");
  const errorMsg = document.getElementById("waitlist-error");
  const successMsg = document.getElementById("waitlist-success");
  const submitBtn = form?.querySelector('button[type="submit"]');
  const hiddenIframe = document.getElementById("hidden_iframe");

  if (!form || !emailInput || !submitBtn || !hiddenIframe) return;

  let submitted = false;

  function isValidEmail(email) {
    return /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/.test(
      email.trim()
    );
  }

  form.addEventListener("submit", (e) => {
    const email = emailInput.value.trim();

    errorMsg.classList.add("hidden");
    successMsg.classList.add("hidden");

    if (!email || !isValidEmail(email)) {
      e.preventDefault();
      errorMsg.classList.remove("hidden");
      emailInput.focus();
      return;
    }

    submitted = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Joining...";
  });

  hiddenIframe.addEventListener("load", () => {
    if (!submitted) return;

    successMsg.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Notify me";
    submitted = false;
  });
});