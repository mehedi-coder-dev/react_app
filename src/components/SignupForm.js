import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import Info from "./Info";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");


  const [error, setError] = useState();
  const [loading, setLoading]= useState()

  const { signup } = useAuth();
  const history = useHistory()
 

  async function handleSubmit(e) {

    e.preventDefault();
    // do validation
    if (password !== confirmPassword) {
      return setError("Password don't match");
    }
    
    try{
      setError("")
      setLoading(true)
      await signup( email, password,username)
      history.push("/")


    } catch(error){
      console.log(error)
      setLoading(false)
      setError("Failed to creacte an account!")

    }

  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput type="text" placeholder="Enter name" icon="person" required value={username} onChange={(e) => setUsername(e.target.value)} />

      <TextInput type="text" placeholder="Enter email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Enter password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox text="I agree to the Terms 	&amp; Conditions" required value={agree} onChange={(e) => setAgree(e.target.value)} />

      <Button disabled={loading} type="submit">
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <Info>
        Already have an account? <Link to="/login">Login</Link> instead.
      </Info>
    </Form>
  );
}
