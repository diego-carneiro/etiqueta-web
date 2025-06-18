import UserForms from "@/components/UserForms";

export default function RecoverPasswordPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-16 bg-white px-8">
      <img
        src="./img/sign-in-img.png"
        alt="Recover Password"
        className="w-[780px] h-[430px] object-contain"
      />
      <UserForms selector="recoverPassword" />
    </div>
  );
}
