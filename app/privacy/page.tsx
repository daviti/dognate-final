import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed">
      <Link href="/register" className="mb-6 inline-block underline">
        Back to Register
      </Link>
      <h1 className="mb-6 text-2xl font-semibold">Privacy Policy</h1>

      <p className="mb-4 text-black/60 dark:text-white/60">
        Dognate.org (&quot;we&quot;) is committed to protecting your privacy.
        This policy explains what personal data we collect and how we use it.
        The data controller is Dognate.org, 1324B McAllister Street, San
        Francisco, CA 94115, USA.
      </p>

      <p className="mb-4">
        <strong>1. Information we collect.</strong> When you register, we
        collect your name, email address, phone number, and password
        (stored as a secure hash, never in plain text). If you add an
        address to your account, we store that too. We also store the
        content of any wish or supply offer you post.
      </p>

      <p className="mb-4">
        <strong>2. How we use it.</strong> We use this information to run
        the site: to create and secure your account, to display the wishes
        and supply offers you post, and to let you manage your own listings
        and addresses. We don&apos;t use your data for advertising, and we
        don&apos;t sell it to third parties.
      </p>

      <p className="mb-4">
        <strong>3. What&apos;s public.</strong> Wishes and supply offers you
        post — including title, description, and any photo — are visible to
        anyone who visits the site. Your account details (email, phone
        number, addresses) are private and are not shown to other users.
      </p>

      <p className="mb-4">
        <strong>4. Cookies.</strong> We use a small number of cookies that
        are necessary to keep you signed in and to remember your session.
        We don&apos;t use advertising or tracking cookies.
      </p>

      <p className="mb-4">
        <strong>5. Where data is stored.</strong> Your data is stored on
        servers we operate or that our hosting provider operates on our
        behalf, and is protected with industry-standard security measures.
        No method of transmission over the internet is completely secure, so
        we can&apos;t guarantee absolute security, but we take reasonable
        steps to protect your data from unauthorized access.
      </p>

      <p className="mb-4">
        <strong>6. Disclosure.</strong> We don&apos;t share your personal
        data with third parties except: to comply with a legal obligation or
        court order, to protect the rights, property, or safety of Dognate or
        our users, or if Dognate&apos;s business or assets are transferred to
        another party, in which case your data would transfer as part of
        that.
      </p>

      <p className="mb-4">
        <strong>7. Your rights.</strong> You can access, update, or delete
        the personal data tied to your account at any time from your account
        settings. You can also contact us to request a copy of your data or
        its deletion.
      </p>

      <p className="mb-4">
        <strong>8. Changes to this policy.</strong> If we make material
        changes to this policy, we&apos;ll post the update here.
      </p>

      <p className="mb-4">
        <strong>9. Contact.</strong> Questions about this policy can be sent
        to info@dognate.com or Dognate.org, 1324B McAllister Street, San
        Francisco, CA 94115, USA.
      </p>

      <p className="text-black/60 dark:text-white/60">
        © {new Date().getFullYear()} Dognate.org
      </p>
    </div>
  );
}
