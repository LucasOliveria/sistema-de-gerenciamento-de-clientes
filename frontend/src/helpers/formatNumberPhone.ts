export function formatNumberPhone(phone: string) {
  let phoneNumberTemplate = "(xx) x xxxx-xxxx";

  for (const number of phone) {
    phoneNumberTemplate = phoneNumberTemplate.replace("x", number);
  }
  return phoneNumberTemplate;
}