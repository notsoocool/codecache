import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="mt-4 max-w-3xl mx-auto p-6 mb-8 bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Terms and Conditions
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to CodeCache! These terms and conditions outline the rules and
        regulations for the use of our website, located at{" "}
        <a
          href="http://localhost:3000"
          className="text-blue-600 hover:underline"
        >
          https://www.codecache.tech/
        </a>
        . By accessing this website, you agree to be bound by these terms.
      </p>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            By accessing and using our website, you accept these terms and
            conditions in full. If you disagree with any part of these terms,
            you must not use our website.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            2. Changes to Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may revise these terms from time to time. The revised terms will
            apply to the use of our website from the date of publication. It is
            your responsibility to review these terms periodically to ensure you
            are aware of any changes.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            3. User Responsibilities
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Users are responsible for their behavior while using our website and
            must not violate any applicable laws or regulations. You agree to
            use the website for lawful purposes only and not to engage in any
            activities that could harm or disrupt the website or its services.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            You must not submit or post any content that is defamatory, obscene,
            abusive, or otherwise objectionable. Any content you provide must be
            accurate and must not impersonate any person or entity.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            4. Intellectual Property
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The content on our website, including text, graphics, logos, and
            software, is the property of CodeCache and is protected by copyright
            and intellectual property laws. You may not reproduce, distribute,
            or create derivative works from any content without our express
            written consent.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            CodeCache will not be liable for any direct, indirect, incidental,
            or consequential damages arising out of or in connection with the
            use of our website. This includes, but is not limited to, damages
            for loss of profits, data, or other intangible losses.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We do not guarantee that our website will be available at all times
            or that the information on the website is complete or accurate. You
            use the website at your own risk.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            6. Changes to the Service
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            CodeCache reserves the right to modify or discontinue the service
            (or any part thereof) at any time, with or without notice. We shall
            not be liable to you or to any third party for any modification,
            suspension, or discontinuation of the service.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            7. Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about these terms, please contact us at
            [Your Contact Information]. We welcome your feedback and suggestions
            regarding our services.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <div className="border-l-2 border-gray-300 h-full mr-4"></div>
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">
            8. Miscellaneous
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If any provision of these terms is found to be invalid or
            unenforceable, the remaining provisions shall remain in effect.
            These terms constitute the entire agreement between you and
            CodeCache regarding the use of our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
