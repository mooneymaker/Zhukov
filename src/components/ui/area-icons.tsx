// Іконки шести карток «карти зростання». Поле 96×96, фірмовий помаранчевий
// градієнт; чорні лінії малюються кольором тексту картки.
// Ідентифікатори градієнтів і фільтрів мають префікс із назви іконки, щоб
// не перетиналися між собою на одній сторінці.
// Окремо від Icon.tsx навмисно: Icon потрапляє в клієнтський код (через
// SplitButton), а ці малюнки важкі й потрібні лише серверній секції карти.

const AREA_ICONS = {
  // Маркетинг
  marketing: (
    <>
      <rect x="13.0789" y="28.4211" width="14.6842" height="48.9473" fill="url(#marketing-paint0_linear_72_27)"/>
      <rect x="29.3947" y="28.4211" width="14.6842" height="48.9473" fill="url(#marketing-paint1_linear_72_27)"/>
      <rect x="45.7104" y="28.4211" width="14.6842" height="48.9473" fill="url(#marketing-paint2_linear_72_27)"/>
      <rect x="62.0262" y="28.4211" width="14.6842" height="48.9473" fill="url(#marketing-paint3_linear_72_27)"/>
      <path d="M9 79H79.9736" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.8158 65.9473L34.2894 41.4736H52.2368L76.7104 17M70.1841 17H76.7104V23.5263" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.8158 48L27.7631 65.9473L39.1842 54.5263L50.6052 65.9473H84.8683M79.9736 70.8421L84.8683 65.9473L79.9736 61.0526" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
      <linearGradient id="marketing-paint0_linear_72_27" x1="20.421" y1="28.4211" x2="20.421" y2="77.3684" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="marketing-paint1_linear_72_27" x1="36.7368" y1="28.4211" x2="36.7368" y2="77.3684" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="marketing-paint2_linear_72_27" x1="53.0525" y1="28.4211" x2="53.0525" y2="77.3684" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="marketing-paint3_linear_72_27" x1="69.3683" y1="28.4211" x2="69.3683" y2="77.3684" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      </defs>
    </>
  ),
  // Продукт і ціни
  product: (
    <>
      <rect x="12" y="27" width="72" height="36" rx="1" fill="url(#product-paint0_linear_73_85)"/>
      <rect x="8.12732" y="29.2363" width="79.7455" height="37.5273" rx="2" fill="url(#product-paint1_linear_73_85)"/>
      <circle cx="48" cy="47.2182" r="13.2909" fill="white"/>
      <path d="M43.54 53.0985C43.26 52.9249 43.1067 52.7141 43.08 52.4661C43.0533 52.2057 43.14 51.9453 43.34 51.6849L43.94 50.8665C44.1533 50.5813 44.3867 50.4263 44.64 50.4015C44.8933 50.3767 45.1733 50.4511 45.48 50.6247C45.8 50.8107 46.18 50.9843 46.62 51.1455C47.06 51.3067 47.52 51.3873 48 51.3873C48.1733 51.3873 48.3467 51.3687 48.52 51.3315C48.7067 51.2943 48.8733 51.2385 49.02 51.1641C49.1667 51.0773 49.28 50.9657 49.36 50.8293C49.4533 50.6929 49.5 50.5255 49.5 50.3271C49.5 50.0791 49.34 49.8621 49.02 49.6761C48.7 49.4902 48.3 49.298 47.82 49.0996C47.34 48.9012 46.8133 48.6904 46.24 48.4672C45.68 48.2316 45.16 47.9464 44.68 47.6116C44.2 47.2768 43.8 46.88 43.48 46.4212C43.16 45.95 43 45.3796 43 44.7101C43 44.1893 43.0933 43.7119 43.28 43.2779C43.4667 42.8315 43.7267 42.4409 44.06 42.1061C44.4067 41.7589 44.8133 41.4737 45.28 41.2505C45.5434 41.1176 45.8217 41.0063 46.1149 40.9168C46.5162 40.7942 46.82 40.4426 46.82 40.023C46.82 39.341 47.1667 39 47.86 39H47.98C48.66 39 49 39.279 49 39.837C49 40.322 49.3712 40.7184 49.8459 40.8182C50.1509 40.8824 50.429 40.9645 50.68 41.0646C51.16 41.2381 51.5533 41.4117 51.86 41.5853C52.1533 41.7465 52.32 41.9511 52.36 42.1991C52.4 42.4347 52.3467 42.6951 52.2 42.9803L51.72 43.8545C51.5467 44.1645 51.3333 44.3443 51.08 44.3939C50.84 44.4435 50.5533 44.3815 50.22 44.2079C49.94 44.0591 49.6067 43.9289 49.22 43.8173C48.8467 43.6933 48.4467 43.6313 48.02 43.6313C47.66 43.6313 47.3133 43.7119 46.98 43.8731C46.66 44.0343 46.5 44.3009 46.5 44.6729C46.5 44.9333 46.66 45.1627 46.98 45.361C47.3 45.547 47.7 45.733 48.18 45.919C48.66 46.0926 49.18 46.291 49.74 46.5142C50.3133 46.7374 50.84 47.0102 51.32 47.3326C51.8 47.655 52.2 48.0518 52.52 48.523C52.84 48.9942 53 49.5708 53 50.2527C53 50.7487 52.9067 51.2199 52.72 51.6663C52.5467 52.1127 52.2867 52.5157 51.94 52.8753C51.6067 53.2349 51.1933 53.5449 50.7 53.8053C50.3829 53.9647 50.0355 54.0908 49.6577 54.1836C49.2853 54.2751 49 54.5935 49 54.977C49 55.659 48.66 56 47.98 56H47.86C47.1667 56 46.82 55.721 46.82 55.163C46.82 54.6736 46.455 54.2674 45.9775 54.1598C45.5654 54.0669 45.1929 53.9487 44.86 53.8053C44.3267 53.5573 43.8867 53.3217 43.54 53.0985Z" fill="currentColor"/>
      <circle cx="30.0181" cy="48.0002" r="1.56364" fill="white"/>
      <circle cx="72.2365" cy="48.0002" r="1.56364" fill="white"/>
      <circle cx="23.7637" cy="48.0002" r="1.56364" fill="white"/>
      <circle cx="65.982" cy="48.0002" r="1.56364" fill="white"/>
      <defs>
      <linearGradient id="product-paint0_linear_73_85" x1="116.684" y1="45" x2="-20.2105" y2="45" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="product-paint1_linear_73_85" x1="87.8728" y1="48" x2="-4.5" y2="48" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white"/>
      </linearGradient>
      </defs>
    </>
  ),
  // Продажі
  sales: (
    <>
      <g filter="url(#sales-filter0_i_74_208)">
      <path d="M76 9.70831L73.3125 7L70.625 9.70831L67.9375 7L65.25 9.70831L62.5625 7L59.875 9.70831L57.1875 7L54.5 9.70831L51.8125 7L49.125 9.70831L46.4375 7L43.75 9.70831L41.0625 7L38.375 9.70831L35.6875 7L33 9.70831V72L73 71.9999C74.6569 71.9999 76 70.6568 76 68.9999V9.70831Z" fill="url(#sales-paint0_linear_74_208)"/>
      </g>
      <g filter="url(#sales-filter1_i_74_208)">
      <path d="M67 25L67.1543 25.0039C68.7394 25.0843 70 26.3949 70 28V72H64V87.292L61.3125 90L58.625 87.292L55.9375 90L53.25 87.292L50.5625 90L47.875 87.292L45.1875 90L42.5 87.292L39.8125 90L37.125 87.292L34.4375 90L31.75 87.292L29.0625 90L26.375 87.292L23.6875 90L21 87.292V27.9707C21 26.3139 22.3431 25 24 25H67Z" fill="url(#sales-paint1_linear_74_208)"/>
      </g>
      <path d="M35.648 55.7571C35.312 55.5631 35.128 55.3275 35.096 55.0503C35.064 54.7593 35.168 54.4683 35.408 54.1772L36.128 53.2626C36.384 52.9438 36.664 52.7706 36.968 52.7429C37.272 52.7152 37.608 52.7983 37.976 52.9923C38.36 53.2002 38.816 53.3942 39.344 53.5744C39.872 53.7546 40.424 53.8446 41 53.8446C41.208 53.8446 41.416 53.8239 41.624 53.7823C41.848 53.7407 42.048 53.6783 42.224 53.5952C42.4 53.4982 42.536 53.3734 42.632 53.221C42.744 53.0686 42.8 52.8815 42.8 52.6597C42.8 52.3826 42.608 52.14 42.224 51.9322C41.84 51.7243 41.36 51.5095 40.784 51.2877C40.208 51.066 39.576 50.8304 38.888 50.581C38.216 50.3177 37.592 49.9989 37.016 49.6247C36.44 49.2505 35.96 48.8071 35.576 48.2943C35.192 47.7677 35 47.1302 35 46.3818C35 45.7998 35.112 45.2662 35.336 44.7812C35.56 44.2823 35.872 43.8457 36.272 43.4716C36.688 43.0835 37.176 42.7648 37.736 42.5153C38.0684 42.359 38.4205 42.2296 38.7923 42.127C39.2431 42.0027 39.584 41.611 39.584 41.1433C39.584 40.3811 40 40 40.832 40H40.976C41.792 40 42.2 40.3118 42.2 40.9354V40.9762C42.2 41.4943 42.5975 41.9189 43.1073 42.0118C43.5159 42.0862 43.8855 42.1847 44.216 42.3074C44.792 42.5015 45.264 42.6955 45.632 42.8895C45.984 43.0697 46.184 43.2983 46.232 43.5755C46.28 43.8388 46.216 44.1298 46.04 44.4486L45.464 45.4256C45.256 45.7721 45 45.973 44.696 46.0284C44.408 46.0839 44.064 46.0146 43.664 45.8206C43.328 45.6543 42.928 45.5088 42.464 45.384C42.016 45.2454 41.536 45.1761 41.024 45.1761C40.592 45.1761 40.176 45.2662 39.776 45.4464C39.392 45.6266 39.2 45.9245 39.2 46.3403C39.2 46.6313 39.392 46.8877 39.776 47.1094C40.16 47.3173 40.64 47.5252 41.216 47.733C41.792 47.9271 42.416 48.1488 43.088 48.3982C43.776 48.6477 44.408 48.9526 44.984 49.3129C45.56 49.6732 46.04 50.1167 46.424 50.6433C46.808 51.1699 47 51.8144 47 52.5766C47 53.1309 46.888 53.6575 46.664 54.1565C46.456 54.6554 46.144 55.1058 45.728 55.5077C45.328 55.9096 44.832 56.256 44.24 56.547C43.845 56.732 43.4107 56.8768 42.9373 56.9816C42.5198 57.074 42.2 57.429 42.2 57.8567C42.2 58.6189 41.792 59 40.976 59H40.832C40 59 39.584 58.6882 39.584 58.0646V57.9941C39.584 57.4885 39.2052 57.0683 38.7091 56.9709C38.1602 56.8633 37.6678 56.722 37.232 56.547C36.592 56.2699 36.064 56.0066 35.648 55.7571Z" fill="white"/>
      <path d="M35 71H49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M35 74H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M35 77H47" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M67 25C68.6569 25 70 26.3431 70 28V72H64V28C64 26.3431 65.3431 25 67 25Z" fill="url(#sales-paint2_linear_74_208)"/>
      <path d="M70 69V72H73C71.3431 72 70 70.6569 70 69Z" fill="url(#sales-paint3_linear_74_208)"/>
      <defs>
      <filter id="sales-filter0_i_74_208" x="9" y="-17" width="67" height="89" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-24" dy="-24"/>
      <feGaussianBlur stdDeviation="14"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.433333 0 0 0 0 0 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_74_208"/>
      </filter>
      <filter id="sales-filter1_i_74_208" x="-3" y="1" width="73" height="89" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-24" dy="-24"/>
      <feGaussianBlur stdDeviation="14"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.433333 0 0 0 0 0 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_74_208"/>
      </filter>
      <linearGradient id="sales-paint0_linear_74_208" x1="43.1786" y1="65.528" x2="-3.11128" y2="9.35938" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="sales-paint1_linear_74_208" x1="32.5989" y1="83.528" x2="-12.1875" y2="21.6008" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="sales-paint2_linear_74_208" x1="63.5" y1="72.5" x2="63.5" y2="25" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FFAB50"/>
      <stop offset="1" stopColor="white"/>
      </linearGradient>
      <linearGradient id="sales-paint3_linear_74_208" x1="63.5" y1="72.5" x2="63.5" y2="25" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FFAB50"/>
      <stop offset="1" stopColor="white"/>
      </linearGradient>
      </defs>
    </>
  ),
  // Клієнтська база
  clients: (
    <>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 71V57C13 59.6892 16.37 62.1424 21.9121 64C28.3208 66.1481 37.6342 67.5 48 67.5C58.3658 67.5 67.6792 66.1481 74.0879 64C79.63 62.1424 83 59.6892 83 57V71C83 76.799 67.33 81.5 48 81.5C28.67 81.5 13 76.799 13 71Z" fill="url(#clients-paint0_linear_74_148)"/>
      <path d="M74.0879 64C79.63 62.1424 83 59.6892 83 57C83 51.201 67.33 46.5 48 46.5C28.67 46.5 13 51.201 13 57C13 59.6892 16.37 62.1424 21.9121 64C28.3208 66.1481 37.6342 67.5 48 67.5C58.3658 67.5 67.6792 66.1481 74.0879 64Z" fill="url(#clients-paint1_linear_74_148)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 55.25V41.25C13 43.9392 16.37 46.3924 21.9121 48.25C28.3208 50.3981 37.6342 51.75 48 51.75C58.3658 51.75 67.6792 50.3981 74.0879 48.25C79.63 46.3924 83 43.9392 83 41.25V55.25C83 61.049 67.33 65.75 48 65.75C28.67 65.75 13 61.049 13 55.25Z" fill="url(#clients-paint2_linear_74_148)"/>
      <path d="M74.0879 48.25C79.63 46.3924 83 43.9392 83 41.25C83 35.451 67.33 30.75 48 30.75C28.67 30.75 13 35.451 13 41.25C13 43.9392 16.37 46.3924 21.9121 48.25C28.3208 50.3981 37.6342 51.75 48 51.75C58.3658 51.75 67.6792 50.3981 74.0879 48.25Z" fill="url(#clients-paint3_linear_74_148)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 39.5V25.5C13 28.1892 16.37 30.6424 21.9121 32.5C28.3208 34.6481 37.6342 36 48 36C58.3658 36 67.6792 34.6481 74.0879 32.5C79.63 30.6424 83 28.1892 83 25.5V39.5C83 45.299 67.33 50 48 50C28.67 50 13 45.299 13 39.5Z" fill="url(#clients-paint4_linear_74_148)"/>
      <path d="M74.0879 32.5C79.63 30.6424 83 28.1892 83 25.5C83 19.701 67.33 15 48 15C28.67 15 13 19.701 13 25.5C13 28.1892 16.37 30.6424 21.9121 32.5C28.3208 34.6481 37.6342 36 48 36C58.3658 36 67.6792 34.6481 74.0879 32.5Z" fill="url(#clients-paint5_linear_74_148)"/>
      <path d="M76.9077 84.66C76.8469 84.7634 76.7595 84.8493 76.6542 84.9089C76.5489 84.9686 76.4295 85 76.3079 85H59.6916C59.5702 84.9999 59.4509 84.9684 59.3457 84.9086C59.2406 84.8489 59.1533 84.7631 59.0926 84.6597C59.0319 84.5564 59 84.4392 59 84.3199C59 84.2006 59.032 84.0834 59.0928 83.9801C60.4108 81.7424 62.442 80.1378 64.8124 79.3772C63.6399 78.6917 62.7289 77.6472 62.2194 76.4041C61.7098 75.161 61.6299 73.788 61.9919 72.496C62.3539 71.2039 63.1377 70.0643 64.2231 69.2521C65.3084 68.4399 66.6352 68 67.9998 68C69.3643 68 70.6912 68.4399 71.7765 69.2521C72.8619 70.0643 73.6457 71.2039 74.0077 72.496C74.3696 73.788 74.2897 75.161 73.7802 76.4041C73.2707 77.6472 72.3597 78.6917 71.1872 79.3772C73.5576 80.1378 75.5888 81.7424 76.9068 83.9801C76.9677 84.0834 76.9998 84.2006 77 84.32C77.0002 84.4393 76.9683 84.5566 76.9077 84.66Z" fill="currentColor"/>
      <defs>
      <linearGradient id="clients-paint0_linear_74_148" x1="83" y1="69.25" x2="13" y2="69.25" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="clients-paint1_linear_74_148" x1="83" y1="57" x2="13" y2="57" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="clients-paint2_linear_74_148" x1="83" y1="53.5" x2="13" y2="53.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="clients-paint3_linear_74_148" x1="83" y1="41.25" x2="13" y2="41.25" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="clients-paint4_linear_74_148" x1="83" y1="37.75" x2="13" y2="37.75" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="clients-paint5_linear_74_148" x1="83" y1="25.5" x2="13" y2="25.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6F00"/>
      <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      </defs>
    </>
  ),
  // Команда і процеси
  team: (
    <>
      <path d="M33 90.75V5.75M40 12.3812L33 5.75L26 12.3812" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M64.5 90.75V5.75M71 12.3812L64.5 5.75L58 12.3812" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M48.5 5.75V90.75M55 84.1188L48.5 90.75L42 84.1188" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="24" y="17" width="48" height="53" rx="3" fill="url(#team-paint0_linear_74_368)"/>
      <rect x="20" y="19" width="56" height="61" rx="3" fill="url(#team-paint1_linear_74_368)"/>
      <rect x="36" y="65" width="24" height="2" rx="1" fill="white"/>
      <rect x="40" y="68" width="16" height="2" rx="1" fill="white"/>
      <path d="M60.9681 55.6683C60.8791 55.8214 60.751 55.9485 60.5968 56.0369C60.4425 56.1252 60.2676 56.1717 60.0895 56.1717H35.7478C35.5698 56.1715 35.395 56.1249 35.241 56.0364C35.087 55.948 34.9591 55.8209 34.8702 55.6679C34.7813 55.5149 34.7345 55.3414 34.7346 55.1648C34.7346 54.9881 34.7815 54.8146 34.8704 54.6617C36.8013 51.3485 39.7768 48.9727 43.2493 47.8465C41.5317 46.8316 40.1972 45.2851 39.4507 43.4446C38.7043 41.604 38.5872 39.5712 39.1175 37.6582C39.6478 35.7452 40.796 34.0579 42.386 32.8553C43.9759 31.6528 45.9197 31.0015 47.9186 31.0015C49.9176 31.0015 51.8613 31.6528 53.4513 32.8553C55.0412 34.0579 56.1895 35.7452 56.7198 37.6582C57.25 39.5712 57.133 41.604 56.3865 43.4446C55.6401 45.2851 54.3056 46.8316 52.5879 47.8465C56.0604 48.9727 59.036 51.3485 60.9668 54.6617C61.056 54.8146 61.1031 54.9881 61.1034 55.1648C61.1036 55.3415 61.0569 55.5152 60.9681 55.6683Z" fill="white"/>
      <defs>
      <linearGradient id="team-paint0_linear_74_368" x1="48" y1="-5.24107" x2="48" y2="70" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="team-paint1_linear_74_368" x1="48" y1="12.0943" x2="48" y2="80" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      </defs>
    </>
  ),
  // Економіка
  economy: (
    <>
      <path d="M22.5302 41.8374V26.3735L35.2651 38.4251L22.5302 41.8374Z" fill="url(#economy-paint0_linear_74_297)"/>
      <path d="M27.0784 39.1084V23.6445L39.8133 35.6961L27.0784 39.1084Z" fill="currentColor"/>
      <path d="M27.0784 39.1084V23.6445L39.8133 35.6961L27.0784 39.1084Z" fill="url(#economy-paint1_linear_74_297)"/>
      <path d="M11.8367 51.588L14.991 51.1938C16.1241 51.0521 17.1456 51.8864 17.2331 53.0249L17.8382 60.8906C17.919 61.9415 17.1704 62.8748 16.1269 63.0239L13.5732 63.3887C12.488 63.5437 11.4803 62.7964 11.3136 61.7129L10.108 53.8767C9.93668 52.7631 10.7186 51.7278 11.8367 51.588Z" fill="url(#economy-paint2_linear_74_297)"/>
      <ellipse cx="48" cy="55.4821" rx="32.747" ry="25.4699" fill="url(#economy-paint3_radial_74_297)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M38.9036 72.765C38.9345 72.5512 38.9036 72.9873 38.9036 72.765Z" fill="url(#economy-paint4_radial_74_297)"/>
      <path d="M38.9036 72.765C38.9036 70.2531 36.8673 68.2168 34.3554 68.2168C28.2925 68.2168 27.3776 81.2689 26.1687 85.4999H37.994L38.9036 72.765Z" fill="url(#economy-paint5_radial_74_297)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M58.9295 72.765C58.8987 72.5512 58.9295 72.9873 58.9295 72.765Z" fill="url(#economy-paint6_radial_74_297)"/>
      <path d="M58.9295 72.765C58.9295 70.2531 60.9658 68.2168 63.4777 68.2168C69.5407 68.2168 70.4556 81.2689 71.6644 85.4999H59.8391L58.9295 72.765Z" fill="url(#economy-paint7_radial_74_297)"/>
      <path d="M42.5421 36.3794H55.2771" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="42.5421" y="10" width="10.9157" height="18.1928" fill="url(#economy-paint8_linear_74_297)" fillOpacity="0.5"/>
      <circle cx="26.1686" cy="46.3857" r="1.81928" fill="white"/>
      <circle cx="47.9999" cy="28.1927" r="5.45783" fill="url(#economy-paint9_radial_74_297)"/>
      <path d="M46.216 29.9759C46.104 29.9147 46.0427 29.8403 46.032 29.7527C46.0213 29.6608 46.056 29.5689 46.136 29.477L46.376 29.1882C46.4613 29.0875 46.5547 29.0328 46.656 29.0241C46.7573 29.0153 46.8693 29.0416 46.992 29.1028C47.12 29.1685 47.272 29.2298 47.448 29.2867C47.624 29.3435 47.808 29.372 48 29.372C48.0693 29.372 48.1387 29.3654 48.208 29.3523C48.2827 29.3392 48.3493 29.3195 48.408 29.2932C48.4667 29.2626 48.512 29.2232 48.544 29.1751C48.5813 29.1269 48.6 29.0678 48.6 28.9978C48.6 28.9103 48.536 28.8337 48.408 28.7681C48.28 28.7024 48.12 28.6346 47.928 28.5646C47.736 28.4945 47.5253 28.4201 47.296 28.3414C47.072 28.2582 46.864 28.1575 46.672 28.0394C46.48 27.9212 46.32 27.7812 46.192 27.6193C46.064 27.453 46 27.2516 46 27.0153C46 26.8315 46.0373 26.663 46.112 26.5098C46.1867 26.3523 46.2907 26.2144 46.424 26.0963C46.5627 25.9737 46.7253 25.8731 46.912 25.7943C47.0151 25.7484 47.1238 25.7098 47.2383 25.6786C47.4031 25.6336 47.528 25.5093 47.528 25.3611C47.528 25.1204 47.6667 25 47.944 25H47.992C48.264 25 48.4 25.0985 48.4 25.2954C48.4 25.4667 48.5528 25.6066 48.748 25.6435C48.8662 25.6659 48.9742 25.6943 49.072 25.7287C49.264 25.7899 49.4213 25.8512 49.544 25.9125C49.6613 25.9694 49.728 26.0416 49.744 26.1291C49.76 26.2123 49.7387 26.3042 49.68 26.4048L49.488 26.7133C49.4187 26.8228 49.3333 26.8862 49.232 26.9037C49.136 26.9212 49.0213 26.8993 48.888 26.8381C48.776 26.7856 48.6427 26.7396 48.488 26.7002C48.3387 26.6565 48.1787 26.6346 48.008 26.6346C47.864 26.6346 47.7253 26.663 47.592 26.7199C47.464 26.7768 47.4 26.8709 47.4 27.0022C47.4 27.0941 47.464 27.1751 47.592 27.2451C47.72 27.3107 47.88 27.3764 48.072 27.442C48.264 27.5033 48.472 27.5733 48.696 27.6521C48.9253 27.7309 49.136 27.8271 49.328 27.9409C49.52 28.0547 49.68 28.1947 49.808 28.3611C49.936 28.5274 50 28.7309 50 28.9716C50 29.1466 49.9627 29.3129 49.888 29.4705C49.8187 29.628 49.7147 29.7702 49.576 29.8972C49.4427 30.0241 49.2773 30.1335 49.08 30.2254C48.9552 30.2807 48.8187 30.3247 48.6705 30.3573C48.5173 30.391 48.4 30.5035 48.4 30.6389C48.4 30.8796 48.264 31 47.992 31H47.944C47.6667 31 47.528 30.9015 47.528 30.7046C47.528 30.5317 47.3779 30.3882 47.1815 30.3486C47.0205 30.3161 46.8746 30.2751 46.744 30.2254C46.5307 30.1379 46.3547 30.0547 46.216 29.9759Z" fill="currentColor"/>
      <defs>
      <linearGradient id="economy-paint0_linear_74_297" x1="29.8488" y1="26.4542" x2="29.2687" y2="41.8659" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="economy-paint1_linear_74_297" x1="34.397" y1="23.7252" x2="33.8169" y2="39.1369" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <linearGradient id="economy-paint2_linear_74_297" x1="14.5" y1="51" x2="13.8885" y2="63.6805" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <radialGradient id="economy-paint3_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48 40) rotate(90) scale(41 48.4714)">
      <stop stopColor="white"/>
      <stop offset="0.811136" stopColor="#FF6F00"/>
      </radialGradient>
      <radialGradient id="economy-paint4_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.543 71.6055) rotate(90) scale(13.9107 9.43512)">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </radialGradient>
      <radialGradient id="economy-paint5_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.543 71.6055) rotate(90) scale(13.9107 9.43512)">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </radialGradient>
      <radialGradient id="economy-paint6_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(65.2901 71.6055) rotate(90) scale(13.9107 9.43512)">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </radialGradient>
      <radialGradient id="economy-paint7_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(65.2901 71.6055) rotate(90) scale(13.9107 9.43512)">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </radialGradient>
      <linearGradient id="economy-paint8_linear_74_297" x1="48.8152" y1="10.0949" x2="47.8796" y2="28.2037" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </linearGradient>
      <radialGradient id="economy-paint9_radial_74_297" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49.7847 27) rotate(135) scale(7.07107)">
      <stop offset="0.57664" stopColor="white"/>
      <stop offset="1" stopColor="#FF6F00"/>
      </radialGradient>
      </defs>
    </>
  ),
};

export type AreaIconName = keyof typeof AREA_ICONS;

export function AreaIcon({ name, className }: { name: AreaIconName; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden className={className}>
      {AREA_ICONS[name]}
    </svg>
  );
}
