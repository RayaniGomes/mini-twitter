export function formatHandle(authorName: string){
  const handle = "@" + authorName.toLowerCase().replace(" ", "");
  return handle;
}

export function formatName(authorName: string) {
  if (!authorName) return "";
  const firstName = authorName.trim().split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}