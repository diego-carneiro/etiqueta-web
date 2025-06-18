import UserForms from "@/components/UserForms";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-16 bg-white px-8">
      <img
        src="./img/sign-in-img.png"
        alt="Sign In"
        className="w-[780px] h-[430px] object-contain"
      />
      <UserForms selector="sign-in" />
    </div>
  );
}
