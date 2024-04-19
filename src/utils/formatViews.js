function formatViews(views) {
  if (views < 1000) {
    return views.toString();
  } else if (views < 1000000) {
    return views / 1000 + "K";
  } else if (views < 1000000000) {
    return views / 1000000 + "M";
  } else {
    return views / 1000000000 + "B";
  }
}

export { formatViews }