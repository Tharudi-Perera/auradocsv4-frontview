export function validateMobileNumber(mobileNo: number): boolean {
    let regexp =  /^(\+\d{1,3}[- ]?)?\d{3}[-]?\d{7}$/;
    // let regexp =   /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return regexp.test(String(mobileNo));
}



export function validateEmail(email: string) : boolean {
    let regexp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    return regexp.test(email);
}

export function  vaildateNewPassword(password:string):boolean{
  let regExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%^&*()])[A-Za-z\d$#@!%^&*()]{8,30}$/
  return regExp.test(password);
}
