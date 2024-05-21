import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../store/getUser";
const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const handleChange = (
    setValue: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setValue(value);
  };

  const onSubbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    await createUser(username);
    navigate("/");
  };
  return (
    <div className="w-[25%]">
      <Card>
        <Form onSubmit={onSubbmit} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your username" />
            </div>
            <TextInput
              value={username}
              onChange={(e) => handleChange(setUsername, e)}
              id="email1"
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              value={password}
              onChange={(e) => handleChange(setPassword, e)}
              id="password1"
              type="password"
              placeholder="******"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
