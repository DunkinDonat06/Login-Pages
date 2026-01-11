import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import welcomeLight from "@/assets/welcome-light.svg";
import welcomeDark from "@/assets/welcome-dark.svg";

export default function Index() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-[#181a20]">
      {/* Navbar */}
      <nav className="absolute left-0 right-0 top-0 flex h-[60px] w-full items-center px-6">
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
              d="M14.6067 10.36C14.3842 10.36 14.2123 10.2589 14.091 10.0567C13.9697 9.85445 13.9697 9.65223 14.091 9.45L17.64 3.29236C17.8018 3.02947 18.004 2.87255 18.2467 2.82159C18.4893 2.77063 18.7522 2.81633 19.0353 2.9587C20.4307 3.58558 21.6642 4.46039 22.736 5.58313C23.8078 6.70586 24.6369 7.9746 25.2233 9.38934C25.3244 9.65223 25.309 9.87993 25.1772 10.0724C25.0453 10.265 24.8383 10.3608 24.556 10.36H14.6067ZM10.269 11.8463L6.62904 5.53702C6.46726 5.27413 6.42682 5.01124 6.50771 4.74836C6.5886 4.48547 6.75037 4.27313 6.99304 4.11136C7.9637 3.4238 9.04073 2.87781 10.2241 2.47336C11.4075 2.06892 12.6662 1.8667 14 1.8667C14.3033 1.8667 14.637 1.88207 15.001 1.91281C15.365 1.94354 15.6683 1.97873 15.911 2.01837C16.1941 2.05881 16.3814 2.18014 16.4728 2.38236C16.5642 2.58459 16.5387 2.80703 16.3963 3.04969L11.3307 11.8463C11.2094 12.0486 11.0322 12.1497 10.7993 12.1497C10.5663 12.1497 10.3896 12.0486 10.269 11.8463ZM2.89805 16.4266C2.67561 16.4266 2.47339 16.351 2.29139 16.1998C2.10939 16.0485 1.99817 15.8612 1.95772 15.638C1.91728 15.4155 1.8918 15.1729 1.88128 14.91C1.87077 14.6471 1.86592 14.3438 1.86672 14C1.86672 12.726 2.0742 11.4569 2.48916 10.1926C2.90412 8.92827 3.54597 7.73031 4.41472 6.59868C4.63716 6.31557 4.89519 6.17402 5.18882 6.17402C5.48244 6.17402 5.70974 6.32568 5.87071 6.62901L10.9667 15.5167C11.088 15.7189 11.0828 15.9211 10.9509 16.1233C10.8191 16.3255 10.6423 16.4266 10.4207 16.4266H2.89805ZM8.9647 25.0413C7.63004 24.3942 6.4066 23.5145 5.29438 22.4023C4.18216 21.2901 3.34294 20.0262 2.77672 18.6106C2.67561 18.3478 2.69583 18.1205 2.83739 17.9287C2.97894 17.737 3.19128 17.6408 3.47439 17.64H13.363C13.5855 17.64 13.7573 17.7411 13.8787 17.9433C14 18.1455 14 18.3478 13.8787 18.55L10.3904 24.6469C10.2286 24.9098 10.0264 25.0817 9.7837 25.1626C9.54103 25.2435 9.26803 25.2031 8.9647 25.0413ZM14 26.1333C13.7169 26.1333 13.3982 26.1183 13.0439 26.0884C12.6896 26.0585 12.3814 26.0229 12.1194 25.9816C11.8362 25.9412 11.6441 25.8198 11.543 25.6176C11.4419 25.4154 11.4621 25.1929 11.6037 24.9503L16.6087 16.2143C16.73 16.0121 16.9322 15.911 17.2153 15.911C17.4984 15.911 17.7007 16.0121 17.822 16.2143L21.4013 22.4326C21.5429 22.6551 21.5886 22.8977 21.5384 23.1606C21.4883 23.4235 21.3212 23.6662 21.0373 23.8886C20.1071 24.5762 19.02 25.1222 17.7759 25.5266C16.5318 25.9311 15.2732 26.1333 14 26.1333ZM22.2203 21.4316L17.0637 12.4833C16.9423 12.2811 16.9476 12.0789 17.0794 11.8767C17.2113 11.6744 17.388 11.5733 17.6097 11.5733H25.102C25.3244 11.5733 25.5266 11.6494 25.7086 11.8014C25.8906 11.9535 26.0019 12.1404 26.0423 12.362C26.0827 12.5844 26.1078 12.8271 26.1175 13.09C26.1272 13.3529 26.1325 13.6562 26.1333 14C26.1333 15.274 25.9258 16.5532 25.5109 17.8377C25.0959 19.1223 24.4541 20.3198 23.5853 21.4304C23.4235 21.6529 23.191 21.7693 22.8876 21.7799C22.5843 21.7904 22.3619 21.6751 22.2203 21.4316Z"
              fill="url(#paint0_linear_6857_14838)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_6857_14838"
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
              <Moon className="h-5 w-5 text-[#212121] dark:text-white" />
            ) : (
              <Sun className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex w-full max-w-[430px] flex-col items-center gap-7 px-6 pb-11 pt-[100px]">
        {/* Illustration */}
        <div className="relative flex h-[228px] w-full items-center justify-center">
          <img
            src={theme === "dark" ? welcomeDark : welcomeLight}
            alt="Welcome illustration"
            className="h-[228px] w-[270px] object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="w-full text-center text-[40px] font-bold leading-[160%] text-[#212121] dark:text-white">
          Let's you in
        </h2>

        {/* Continue with Google Button */}
        <button className="flex w-full items-center justify-center gap-3 rounded-full border border-[#EEEEEE] bg-white px-8 py-[18px] transition-all hover:bg-gray-50 dark:border-[#35383f] dark:bg-[#1f222a] dark:hover:bg-[#252830]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6857_7783)">
              <path
                d="M23.0279 12.2244C23.0279 11.2412 22.9495 10.5236 22.7799 9.77954H11.7495V14.2175H18.2241C18.0936 15.3204 17.3887 16.9814 15.8222 18.0975L15.8003 18.246L19.2879 20.9962L19.5295 21.0208C21.7486 18.9346 23.0279 15.8652 23.0279 12.2244Z"
                fill="#4285F4"
              />
              <path
                d="M11.7495 23.9176C14.9215 23.9176 17.5844 22.8545 19.5295 21.0209L15.8222 18.0976C14.8302 18.8018 13.4987 19.2934 11.7495 19.2934C8.64276 19.2934 6.00594 17.2074 5.06598 14.324L4.92821 14.3359L1.30176 17.1927L1.25433 17.3269C3.18626 21.2334 7.15458 23.9176 11.7495 23.9176Z"
                fill="#34A853"
              />
              <path
                d="M5.06611 14.324C4.81809 13.58 4.67456 12.7826 4.67456 11.9589C4.67456 11.135 4.8181 10.3378 5.05306 9.59366L5.04649 9.43519L1.3746 6.53247L1.25446 6.59064C0.458226 8.21174 0.00134277 10.0322 0.00134277 11.9589C0.00134277 13.8855 0.458226 15.7059 1.25446 17.327L5.06611 14.324Z"
                fill="#FBBC05"
              />
              <path
                d="M11.7495 4.62403C13.9555 4.62403 15.4436 5.59401 16.2921 6.40461L19.6078 3.10928C17.5714 1.1826 14.9215 0 11.7495 0C7.15457 0 3.18625 2.68406 1.25433 6.59056L5.05293 9.59359C6.00593 6.7102 8.64275 4.62403 11.7495 4.62403Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_6857_7783">
                <rect width="23.04" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-base font-semibold leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-[#EEEEEE] dark:bg-[#35383f]" />
          <span className="text-lg font-medium leading-[160%] text-[#616161] dark:text-[#e0e0e0]">
            or
          </span>
          <div className="h-px flex-1 bg-[#EEEEEE] dark:bg-[#35383f]" />
        </div>

        {/* Sign in with password Button */}
        <button className="w-full rounded-full bg-[#4B68FF] px-4 py-[18px] shadow-[4px_8px_24px_0_rgba(75,104,255,0.25)] transition-all hover:bg-[#3B58EF]">
          <span className="text-base font-bold leading-[160%] tracking-[0.2px] text-white">
            Sign in with password
          </span>
        </button>

        {/* Sign up link */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-base font-medium leading-[160%] tracking-[0.2px] text-[#212121] dark:text-white">
            Don't have an account?
          </span>
          <Link
            to="/signup"
            className="text-base font-bold leading-[160%] tracking-[0.2px] text-[#4B68FF] transition-colors hover:text-[#3B58EF]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
