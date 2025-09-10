export const useToast = () => ({
  showCommingSoon: () => {
    useNuxtApp().$toast.info("This feature is coming soon!");
  },

  // Show success message
  showSuccess: (message?: string, options?: Object) => {
    useNuxtApp().$toast(message || "Operation completed successfully", {
      type: "success",
      ...options,
    });
  },

  errorHandler: (err: any, customMessage?: any) => {
    // console.log(err.response)
    // return;
    if (customMessage) {
      useNuxtApp().$toast.error(customMessage);
      return;
    }

    if (err.response.status == 422) {
      for (let key in err.response._data.errors) {
        if (err.response._data.errors.hasOwnProperty(key)) {
          err.response._data.errors[key].forEach((message) => {
            useNuxtApp().$toast.error(message);
          });
        }
      }
      return;
    }

    // if (typeof err.response?._data === "object") {
    //   for (let i in err.response._data) {
    //     useNuxtApp().$toast.error(err.response._data[i]);
    //   }
    //   return;
    // }

    if (err.response?.status >= 400 && err.response?.status < 500) {
      if (err.response?._data?.message?.length) {
        useNuxtApp().$toast.error(err.response._data?.message);
        return;
      }
    }
    if (err.message) {
      useNuxtApp().$toast.error(err.message);
      return;
    }

    useNuxtApp().$toast.error("Some Error happed!");
  },
});

// Return first 2 letters
export const useFirstLetters = (value: any) => {
  return value
    .split(" ")
    .map((word: any) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

// return first and last name
export const getFirstLastName = (value: any) => {
  const words = value.split(" ");
  const firstInitial = words[0];
  const lastInitial = words[words.length - 1];
  return firstInitial + " " + lastInitial;
};

export function generateRandomColor() {
  // Generate random values for red, green, and blue channels
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Create the color string in hexadecimal format
  var color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

  return color;
}

export function useObjToFormData(object) {
  let data = new FormData();
  for (let i in object) {
    if (object[i] && !Array.isArray(object[i])) {
      data.append(i, object[i]);
    }

    if (Array.isArray(object[i])) {
      for (let i2 in object[i]) {
        data.append(`${i}[${i2}]`, object[i][i2]);
      }
    }
  }
  return data;
}

export function getFileType(url: any) {
  if (!url) return "";
  // Create a regular expression to match the file extension
  const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);

  // If a match is found, return the file extension
  if (match) {
    return match[1];
  }

  // Return null if no file extension is found
  return null;
}

export function useDebounceFunc(fn, delay) {
  let timeout;

  // Return a debounced function
  return function (args) {
    // Clear the previous timeout if the function is called again
    if (timeout) clearTimeout(timeout);

    // Set a new timeout to execute the function after the delay
    timeout = setTimeout(() => {
      fn(args);
    }, delay);
  };
}
