class ErrorHandler {
  /*
    {
        "message": "API rate limit exceeded for xxx.xxx.xxx.xxx. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
        "documentation_url": "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
    }
    */
  constructor(error) {
    this.error = error;
    this.errorMsg = this.getErrorMsg();
  }

  describe() {
    console.log(`${this.errorMsg ? this.errorMsg : "Udefined Error Msg"}.`);
  }

  getErrorMsg() {
    const errorMsg =
      this.error && this.error.message ? this.error.message : null;
    return errorMsg;
  }
}

export class GeneralErrorHandler extends ErrorHandler {
  errorMap = {
    "API rate limit exceeded for":
      "You have used all your search quota, please come back after an hour.",
  };

  constructor(action, error) {
    super(error);
    this.action = action;
  }

  setErrorMsg() {
    this.errorMsg = this.getErrorMsg();
    for (let i = 0; i < Object.keys(this.errorMap).length; i++) {
      const key = Object.keys(this.errorMap)[i];
      if (this.errorMsg && this.errorMsg.includes(key)) {
        return this.errorMap[key];
      }
    }
    return this.errorMsg
      ? this.errorMsg[0].toUpperCase() + this.errorMsg.substring(1) + "."
      : `Failed to ${this.action}, please try again later.`;
  }
}
