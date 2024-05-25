import { Button, Card, Datepicker, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/formatDate";
import { postRequest } from "../api";
import { useUserStore } from "../store/user.store";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {setUser} = useUserStore()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDateChange = (date: any) => {
    const dataTime = formatDateTime(date)
    setFormData({
      ...formData,
      dateOfBirth: dataTime.date,
    });
  };

  const onSubmit = async () => {
    try {
    const postData = await postRequest({ url: "/users/create", body: formData });
    setUser(postData)
    
    } catch (error) {
        console.log(error);
    }
   navigate("/");
  };
  return (
    <div className="w-[25%]">
      <Card>
        <Form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-1 block">
              <Label htmlFor="username1" value="Your username" />
            </div>
            <TextInput
              id="username1"
              type="text"
              placeholder="username"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              placeholder="email@gmail.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="username1" value="Your Birthday" />
            </div>
            <Datepicker
              name="birthday"
              maxDate={new Date()}
              onSelectedDateChanged={(date) => handleDateChange(date)}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="name1" value="Your firstname" />
            </div>
            <TextInput
              id="name1"
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="username1" value="Your secondname" />
            </div>
            <TextInput
              id="username1"
              type="text"
              name="lastName"
              placeholder="Deer"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <div className="mb-1 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="******"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
