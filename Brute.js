  const box = document.getElementById("groupingcolumn");
  const header = document.getElementById("groupingcolumnheader");

  // Required so left/top actually work
//   box.style.position = "absolute";

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    // Prevent text selection while dragging
    e.preventDefault();

    isDragging = true;

    const rect = box.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;

    box.style.left = `${e.clientX - offsetX}px`;
    box.style.top  = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  const resizeHandle = box.querySelector(".resizeicon");

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  resizeHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation(); // don’t trigger dragging

    isResizing = true;

    startX = e.clientX;
    startY = e.clientY;

    const rect = box.getBoundingClientRect();
    startWidth = rect.width;
    startHeight = rect.height;

    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", stopResize);
  });

  function onResize(e) {
    if (!isResizing) return;

    const newWidth = startWidth + (e.clientX - startX);
    const newHeight = startHeight + (e.clientY - startY);

    // Optional minimum size
    box.style.width = Math.max(newWidth, 200) + "px";
    // box.style.height = Math.max(newHeight, 150) + "px";
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
  }