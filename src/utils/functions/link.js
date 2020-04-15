export const createLink = ({ filename, type, content }) => {
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.innerHTML = "Download File";

  downloadLink.href = window.URL.createObjectURL(content);
  downloadLink.onclick = (event) => {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();
};