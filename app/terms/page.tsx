import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed">
      <Link href="/register" className="mb-6 inline-block underline">
        Back to Register
      </Link>
      <h1 className="stamped mb-6 text-3xl">Terms and Conditions</h1>

      <p className="mb-4 text-ink-soft">
        Dognate is operated by Dognate.org, 1324B McAllister Street, San
        Francisco, CA 94115, USA.
      </p>

      <p className="mb-4">
        <strong>1. Introduction.</strong> These terms govern the relationship
        between Dognate.org and the people who use this site to post items
        they need for animals in their care, or items they can offer. Dognate
        is an open platform: wishes and supply offers you post are visible to
        anyone visiting the site, not just registered users. By using the
        site, or registering an account, you agree to these Terms and to our{" "}
        <Link href="/privacy" className="underline decoration-twine">
          Privacy Policy
        </Link>
        . We don&apos;t guarantee the site will be available at all times and
        may suspend access for maintenance or reasons outside our control.
      </p>

      <p className="mb-4">
        <strong>2. Registration and security.</strong> You must be 18 or
        older to register. To register you provide your name, email, phone
        number, and a password, which are your login details. Keep your
        password confidential — we will never ask for it by email or phone.
        You&apos;re responsible for activity under your account if a third
        party gains access to it through your own negligence.
      </p>

      <p className="mb-4">
        <strong>3. Visibility of content.</strong> Wishes and supply offers
        you post, including their title, description, and any photo, are
        public and can be viewed by anyone, including search engines. Your
        account details beyond what you choose to post are not shown
        publicly. Addresses you add to your account are private to you and
        are not displayed to other users by this site.
      </p>

      <p className="mb-4">
        <strong>4. Posting guidelines.</strong> You&apos;re responsible for
        the legality and accuracy of anything you post. Don&apos;t post
        content that is illegal, threatening, defamatory, obscene,
        discriminatory, infringes someone else&apos;s rights, or that you
        don&apos;t have the right to post. Don&apos;t use the site to spam,
        advertise unrelated goods or services, or distribute malware. We may
        review, remove, or refuse to publish any content at our discretion,
        and we may cooperate with law enforcement regarding content that
        breaches these guidelines.
      </p>

      <p className="mb-4">
        <strong>5. Your content stays yours.</strong> You keep ownership of
        anything you post. By posting it, you grant Dognate a license to
        display it on the site for as long as it remains posted. You can
        delete a wish or supply offer at any time, which removes it from the
        site.
      </p>

      <p className="mb-4">
        <strong>6. Breach of these terms.</strong> Content that breaches
        these guidelines may be removed without notice, and accounts that
        repeatedly breach them may be warned, suspended, or terminated. To
        report a problem, contact us at info@dognate.com.
      </p>

      <p className="mb-4">
        <strong>7. Deleting your account.</strong> You can request deletion of
        your account at any time; doing so removes your personal data and the
        content tied to your account.
      </p>

      <p className="mb-4">
        <strong>8. Disclaimer and liability.</strong> The site is provided
        &quot;as is&quot; without warranties of any kind. We don&apos;t
        verify the accuracy of what users post — use your own judgment before
        acting on a wish or supply offer, especially anything touching animal
        health or veterinary care. To the extent permitted by law, Dognate is
        not liable for losses arising from your use of the site or from
        content posted by other users.
      </p>

      <p className="mb-4">
        <strong>9. Changes to these terms.</strong> We may update these terms
        from time to time; changes will be posted on this page.
      </p>

      <p className="mb-4">
        <strong>10. Governing law.</strong> These terms are governed by the
        laws of the United States and the State of California.
      </p>

      <p className="text-ink-soft">
        © {new Date().getFullYear()} Dognate.org
      </p>
    </div>
  );
}
