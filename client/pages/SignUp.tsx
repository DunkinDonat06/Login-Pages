import { useNavigate } from "react-router-dom";
import { Moon, Sun, ArrowLeft, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  const getEmailError = (email: string) => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!validateEmail(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    return password === confirmPassword && password.length >= 6;
  };

  const getPasswordError = (password: string) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    const newErrors = { ...errors };

    if (field === "email") {
      newErrors.email = touched.email ? getEmailError(value) : "";
    }

    if (field === "password") {
      newErrors.password = touched.password ? getPasswordError(value) : "";
    }

    if (field === "password" || field === "confirmPassword") {
      if (formData.confirmPassword || value) {
        const pwd = field === "password" ? value : formData.password;
        const confirmPwd = field === "confirmPassword" ? value : formData.confirmPassword;
        if (pwd && confirmPwd && pwd !== confirmPwd) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          newErrors.confirmPassword = "";
        }
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, email: true, password: true }));

    // Validate all fields
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else {
      newErrors.fullName = "";
    }

    newErrors.email = getEmailError(formData.email);
    if (newErrors.email) {
      isValid = false;
    }

    newErrors.password = getPasswordError(formData.password);
    if (newErrors.password) {
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (!validatePasswords(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Form submitted:", formData);
    }
  };

  // Check if form is valid (all fields filled and no errors)
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.password.length >= 6 &&
    formData.confirmPassword.trim() !== "" &&
    validateEmail(formData.email) &&
    validatePasswords(formData.password, formData.confirmPassword) &&
    !errors.email &&
    !errors.confirmPassword;


  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-[#181a20]">
      {/* Navbar */}
      <nav className="flex h-[60px] w-full items-center px-6">
        <div className="mx-auto flex w-full max-w-[430px] items-center gap-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
                          <path
                          d="M14.6067 10.36C14.3842 10.36 14.2123 10.2589 14.091 10.0567C13.9697 9.85445 13.9697 9.65223 14.091 9.45L17.64 3.29236C17.8018 3.02947 18.004 2.87255 18.2467 2.82159C18.4893 2.77063 18.7522 2.81633 19.0353 2.9587C20.4307 3.58558 21.6642 4.46039 22.736 5.58313C23.8078 6.70586 24.6369 7.9746 25.2233 9.38934C25.3244 9.65223 25.309 9.87993 25.1772 10.0724C25.0453 10.265 24.8383 10.3608 24.556 10.36H14.6067ZM10.269 11.8463L6.62904 5.53702C6.46726 5.27413 6.42682 5.01124 6.50771 4.74836C6.5886 4.48547 6.75037 4.27313 6.99304 4.11136C7.9637 3.4238 9.04073 2.87781 10.2241 2.47336C11.4075 2.06892 12.6662 1.8667 14 1.8667C14.3033 1.8667 14.637 1.88207 15.001 1.91281C15.365 1.94354 15.6683 1.97873 15.911 2.01837C16.1941 2.05881 16.3814 2.18014 16.4728 2.38236C16.5642 2.58459 16.5387 2.80703 16.3963 3.04969L11.3307 11.8463C11.2094 12.0486 11.0322 12.1497 10.7993 12.1497C10.5663 12.1497 10.3896 12.0486 10.269 11.8463ZM2.89805 16.4266C2.67561 16.4266 2.47339 16.351 2.29139 16.1998C2.10939 16.0485 1.99817 15.8612 1.95772 15.638C1.91728 15.4155 1.8918 15.1729 1.88128 14.91C1.87077 14.6471 1.86592 14.3438 1.86672 14C1.86672 12.726 2.0742 11.4569 2.48916 10.1926C2.90412 8.92827 3.54597 7.73031 4.41472 6.59868C4.63716 6.31557 4.89519 6.17402 5.18882 6.17402C5.48244 6.17402 5.70974 6.32568 5.87071 6.62901L10.9667 15.5167C11.088 15.7189 11.0828 15.9211 10.9509 16.1233C10.8191 16.3255 10.6423 16.4266 10.4207 16.4266H2.89805ZM8.9647 25.0413C7.63004 24.3942 6.4066 23.5145 5.29438 22.4023C4.18216 21.2901 3.34294 20.0262 2.77672 18.6106C2.67561 18.3478 2.69583 18.1205 2.83739 17.9287C2.97895 17.737 3.19128 17.6408 3.47439 17.64H13.363C13.5854 17.64 13.7573 17.7411 13.8787 17.9433C14 18.1455 14 18.3478 13.8787 18.55L10.3903 24.6469C10.2286 24.9098 10.0263 25.0817 9.78371 25.1626C9.54104 25.2435 9.26804 25.2031 8.9647 25.0413ZM14 26.1333C13.7169 26.1333 13.3982 26.1183 13.0439 26.0884C12.6896 26.0585 12.3814 26.0229 12.1193 25.9816C11.8362 25.9412 11.6441 25.8198 11.543 25.6176C11.4419 25.4154 11.4621 25.1929 11.6037 24.9503L16.6086 16.2143C16.73 16.0121 16.9322 15.911 17.2153 15.911C17.4984 15.911 17.7006 16.0121 17.822 16.2143L21.4013 22.4326C21.5428 22.6551 21.5885 22.8977 21.5384 23.1606C21.4882 23.4235 21.3212 23.6662 21.0373 23.8886C20.1071 24.5762 19.0199 25.1222 17.7759 25.5266C16.5318 25.9311 15.2732 26.1333 14 26.1333ZM22.2203 21.4316L17.0636 12.4833C16.9423 12.2811 16.9476 12.0789 17.0794 11.8767C17.2113 11.6744 17.388 11.5733 17.6096 11.5733H25.1019C25.3244 11.5733 25.5266 11.6494 25.7086 11.8014C25.8906 11.9535 26.0018 12.1404 26.0423 12.362C26.0827 12.5844 26.1078 12.8271 26.1175 13.09C26.1272 13.3529 26.1325 13.6562 26.1333 14C26.1333 15.274 25.9258 16.5532 25.5109 17.8377C25.0959 19.1223 24.454 20.3198 23.5853 21.4304C23.4235 21.6529 23.191 21.7693 22.8876 21.7799C22.5843 21.7904 22.3618 21.6751 22.2203 21.4316Z"
                          fill="url(#paint0_linear_signup)"
                          />
                          <defs>
                          <linearGradient
                          id="paint0_linear_signup"
                          x1="26.1333"
                          y1="26.1333"
                          x2="-2.74183"
                          y2="17.7612"
                          gradientUnits="userSpaceOnUse"
                          >
                          <stop stopColor="#4B68FF" />
                          <stop offset="1" stopColor="#6A82FF" />
                          </linearGradient>
                          </defs>
                        </svg>
          <h1 className="flex-1 text-2xl font-bold leading-[160%] text-[#212121] dark:text-white">
            TextlyPDF
          </h1>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-[#35383f]"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-[#212121]" />
            ) : (
              <Sun className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex w-full max-w-[430px] flex-1 flex-col px-6 pb-12 pt-4">
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-7">
          {/* Header with Back Button */}
          <div className="flex h-12 items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-[#35383f]"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-[#212121] dark:text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-bold leading-[160%] text-[#212121] dark:text-white">
                Create an account 🔐
              </h2>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="fullName"
                  className="text-base font-bold leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white"
                >
                  Full Name
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Full Name"
                    className="bg-transparent text-xl font-bold leading-[160%] text-[#212121] placeholder:text-[#9e9e9e] focus:outline-none dark:text-white dark:placeholder:text-[#9e9e9e]"
                  />
                  <div className="h-px rounded-full bg-[#4b68ff]" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="email"
                  className="text-base font-bold leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white"
                >
                  Email
                </label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => {
                        if (!touched.email) {
                          setTouched((prev) => ({ ...prev, email: true }));
                        }
                        setErrors((prev) => ({ ...prev, email: getEmailError(formData.email) }));
                      }}
                      placeholder="Email"
                      className="flex-1 bg-transparent text-xl font-bold leading-[160%] text-[#212121] placeholder:text-[#9e9e9e] focus:outline-none dark:text-white dark:placeholder:text-[#9e9e9e]"
                    />
                    {formData.email && (
                      <div className="flex-shrink-0">
                        {validateEmail(formData.email) ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-green-500">
                          <path
                            d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                            fill="currentColor"
                          />
                        </svg>
                        ) : (
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`h-px rounded-full transition-colors ${
                      errors.email ? "bg-red-500" : "bg-[#4b68ff]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="password"
                  className="text-base font-bold leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white"
                >
                  Password
                </label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onBlur={() => {
                        if (!touched.password) {
                          setTouched((prev) => ({ ...prev, password: true }));
                        }
                        setErrors((prev) => ({ ...prev, password: getPasswordError(formData.password) }));
                      }}
                      placeholder="Password"
                      className="flex-1 bg-transparent text-xl font-bold leading-[160%] text-[#212121] placeholder:text-[#9e9e9e] focus:outline-none dark:text-white dark:placeholder:text-[#9e9e9e]"
                    />
                    {formData.password && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded transition-colors hover:bg-gray-200 dark:hover:bg-[#35383f]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-[#4B68FF]">
                          <path
                          d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
                          fill="currentColor"
                          />
                        </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-[#4B68FF]">
                          <path
                          d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"
                          fill="currentColor"
                          />
                        </svg>
                        )}
                      </button>
                    )}
                  </div>
                  <div
                    className={`h-px rounded-full transition-colors ${
                      errors.password ? "bg-red-500" : "bg-[#4b68ff]"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="confirmPassword"
                  className="text-base font-bold leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm Password"
                      className="flex-1 bg-transparent text-xl font-bold leading-[160%] text-[#212121] placeholder:text-[#9e9e9e] focus:outline-none dark:text-white dark:placeholder:text-[#9e9e9e]"
                    />
                    {formData.confirmPassword && (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded transition-colors hover:bg-gray-200 dark:hover:bg-[#35383f]"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-[#4B68FF]">
                          <path
                          d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
                          fill="currentColor"
                          />
                        </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-[#4B68FF]">
                          <path
                          d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"
                          fill="currentColor"
                          />
                        </svg>
                        )}
                      </button>
                    )}
                  </div>
                  <div
                    className={`h-px rounded-full transition-colors ${
                      errors.confirmPassword ? "bg-red-500" : "bg-[#4b68ff]"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                    rememberMe ? "bg-[#4b68ff]" : "border-2 border-[#e0e0e0] dark:border-[#35383f]"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                          <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.0607 4.43934C13.6464 5.02513 13.6464 5.97487 13.0607 6.56066L7.06066 12.5607C6.47487 13.1464 5.52513 13.1464 4.93934 12.5607L1.93934 9.56066C1.35355 8.97487 1.35355 8.02513 1.93934 7.43934C2.52513 6.85355 3.47487 6.85355 4.06066 7.43934L6 9.37868L10.9393 4.43934C11.5251 3.85355 12.4749 3.85355 13.0607 4.43934Z"
                          fill="white"
                          />
                        </svg>
                  )}
                </div>
                <span className="text-lg font-semibold tracking-[0.2px] text-[#212121] dark:text-white">
                  Remember me
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Button Bar */}
      <div className="w-full border-t border-[#f5f5f5] bg-white px-6 pb-9 pt-6 dark:border-[#35383f] dark:bg-[#181a20]">
        <div className="mx-auto w-full max-w-[430px]">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full rounded-full px-4 py-[18px] transition-all ${
              isFormValid
                ? "bg-[#4B68FF] shadow-[4px_8px_24px_0_rgba(75,104,255,0.25)] hover:bg-[#3b58ef]"
                : "bg-[#3C53CC] cursor-not-allowed"
            }`}
          >
            <span className="text-base font-bold leading-[160%] tracking-[0.2px] text-white">
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
