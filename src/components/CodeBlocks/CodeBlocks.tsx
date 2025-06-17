import React from "react";

const codeSnippets = [
  {
    title: "calculateAge",
    code: `function calculateAge(birthYear) {
  // Function to calculate person's age
  const currentYear = 2024;
  const age = currentYear - birthYear;
  
  return "Your age is: " + age + " years";
}`
  },
  {
    title: "greetPerson",
    code: `function greetPerson(name) {
  // Function to greet person based on time
  const hour = new Date().getHours();
  let greeting = "";
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";
  
  return greeting + " " + name + "!";
}`
  },
  {
    title: "calculatePrice",
    code: `function calculatePrice(productPrice) {
  // Function to calculate price with VAT
  const vatRate = 18;
  const vatAmount = productPrice * (vatRate / 100);
  const totalPrice = productPrice + vatAmount;
  
  return "Total price with VAT: $" + totalPrice;
}`
  },
  {
    title: "checkTemperature",
    code: `function checkTemperature(temp) {
  // Function to check weather condition
  let condition = "";
  
  if (temp < 10) condition = "Cold";
  else if (temp < 25) condition = "Normal";
  else condition = "Hot";
  
  return "Weather condition: " + condition;
}`
  },
  {
    title: "calculateGrade",
    code: `function calculateGrade(score) {
  // Function to calculate letter grade
  let letterGrade = "";
  
  if (score >= 90) letterGrade = "AA";
  else if (score >= 80) letterGrade = "BA";
  else if (score >= 70) letterGrade = "BB";
  else letterGrade = "FF";
  
  return "Your grade is: " + letterGrade;
}`
  },
  {
    title: "calculateDiscount",
    code: `function calculateDiscount(price) {
  // Function to calculate discounted price
  const discountRate = 20;
  const discountAmount = price * (discountRate / 100);
  const finalPrice = price - discountAmount;
  
  return "Discounted price: $" + finalPrice;
}`
  },
  {
    title: "checkPassword",
    code: `function checkPassword(password) {
  // Function to check password strength
  let strength = "";
  
  if (password.length < 6) strength = "Weak";
  else if (password.length < 10) strength = "Medium";
  else strength = "Strong";
  
  return "Password strength: " + strength;
}`
  },
  {
    title: "calculateBMI",
    code: `function calculateBMI(weight, height) {
  // Function to calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const result = bmi.toFixed(1);
  
  return "Your BMI is: " + result;
}`
  },
  {
    title: "calculateTip",
    code: `function calculateTip(bill) {
  // Function to calculate tip amount
  const tipRate = 10;
  const tipAmount = bill * (tipRate / 100);
  const totalPayment = bill + tipAmount;
  
  return "Total payment with tip: $" + totalPayment;
}`
  },
  {
    title: "calculateParkingFee",
    code: `function calculateParkingFee(hours) {
  // Function to calculate parking fee
  const hourlyRate = 20;
  const totalFee = hours * hourlyRate;
  
  if (hours > 5) discount = totalFee * 0.1;
  
  return "Parking fee: $" + totalFee;
}`
  }
];

interface CodeBlockProps {
  code: {
    title: string;
    code: string;
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const formatCode = (code: string) => {
    return code.split('\n').map((line) => {
      const commentMatch = line.match(/(\/\/.+)/);
      const keywordMatch = line.match(/(function|const|let|if|else|return)/g);
      const stringMatch = line.match(/("[^"]*")/g);
      
      let formattedLine = line;
      
      if (commentMatch) {
        formattedLine = formattedLine.replace(commentMatch[0], `<span class="text-[#607B96]">${commentMatch[0]}</span>`);
      }
      if (keywordMatch) {
        keywordMatch.forEach(keyword => {
          formattedLine = formattedLine.replace(keyword, `<span class="text-[#4D5BCE]">${keyword}</span>`);
        });
      }
      if (stringMatch) {
        stringMatch.forEach(str => {
          formattedLine = formattedLine.replace(str, `<span class="text-[#FEA55F]">${str}</span>`);
        });
      }
      
      return formattedLine;
    }).join('\n');
  };

  return (
    <div className="bg-[#011627] rounded-xl overflow-hidden shadow-xl mx-2 sm:mx-4 shadow shadow-[#1E2D3D] border-4 border-[#1E2D3D] w-[360px] sm:w-[360px] lg:w-[650px] md:w-[520px] min-h-[200px] max-h-[400px]">
      <div className="border-b border-[#1E2D3D] px-2 sm:px-4 py-[10px] flex items-center justify-between bg-[#011627]">
        <div className="flex items-center gap-2">
          <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F56]"></div>
          <div className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E]"></div>
          <div className="w-[11px] h-[11px] rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-[#607B96] text-xs">{code.title}</div>
      </div>
      <div className="px-[10px] sm:px-[22px] py-[18px] text-[10px] md:text-[13px] lg:text-[15px] overflow-y-auto flex-grow">
        <pre className="text-[#E5E9F0] font-mono whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={{ __html: formatCode(code.code) }} />
        </pre>
      </div>
    </div>
  );
};

export const CodeBlocks = () => {
  return (
    <div className="h-[calc(100vh-116px)] flex items-center justify-center overflow-hidden relative">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .continuous-scroll {
            animation: scroll 100s linear infinite;
            will-change: transform;
          }
          .continuous-scroll:hover {
            animation-play-state: paused;
          }
          .scroll-wrapper {
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .scroll-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 0;
          }
          .scroll-content > div {
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          .scroll-content > div:hover {
            opacity: 1;
          }
          @media (max-width: 768px) {
            .scroll-content {
              padding: 1rem 0;
              gap: 1rem;
            }
          }
        `}
      </style>
      <div className="scroll-wrapper h-full">
        <div className="continuous-scroll">
          <div className="scroll-content">
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, index) => (
              <CodeBlock key={index} code={snippet} />
            ))}
          </div>
          <div className="scroll-content" aria-hidden={true}>
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, index) => (
              <CodeBlock key={`clone-${index}`} code={snippet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
