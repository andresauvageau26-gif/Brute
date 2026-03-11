document.querySelectorAll(".moveable").forEach((box) => {
  const header = box.querySelector(".moveicon");
  const resizeHandle = box.querySelector(".resizeicon");

  // --- Dragging ---
  let isDragging = false;
  let originalX = 0;
  let originalY = 0;
  let offsetX = 0;
  let offsetY = 0;

  if (header) {
    header.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;

      originalX = box.style.left;
      originalY = box.style.top;

      const rect = box.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    box.style.left = `${e.clientX - offsetX}px`;
    box.style.top  = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    const grid = document.querySelector("div.gridarea");
    if (grid) {
      const rect = box.getBoundingClientRect();

      box.style.left = `${rect.left}px`;
      box.style.top  = `${rect.top}px`;
      if (rect.left > 250 && rect.top > 100) {
         grid.appendChild(box);
      } else {
        box.style.left = originalX;
        box.style.top  = originalY;
      }
    }
  }

  // --- Resizing ---
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  if (resizeHandle) {
    resizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;

      startX = e.clientX;
      startY = e.clientY;

      const rect = box.getBoundingClientRect();
      startWidth = rect.width;
      startHeight = rect.height;

      document.addEventListener("mousemove", onResize);
      document.addEventListener("mouseup", stopResize);
    });
  }

  function onResize(e) {
    if (!isResizing) return;
    const newWidth = startWidth + (e.clientX - startX);
    const newHeight = startHeight + (e.clientY - startY);

    let sWidth = Math.max(Math.min(newWidth, 700), 200);
    sWidth = Math.round(sWidth / 100);
    box.style.width = sWidth + "24px";
    // box.style.height = Math.max(newHeight, 150) + "px";
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
  }
});