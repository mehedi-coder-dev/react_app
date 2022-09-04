import Image from "../../assets/images/signup.svg";
import Illustration from "../../components/Illustration";
import SignupForm from "../SignupForm";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>
      <div class="column">
        <Illustration Image={Image} alt="Signup" />
        <SignupForm />
      </div>
    </>
  );
}
