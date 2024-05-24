import { Button,  Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../api";

const EditUser = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    id: "",
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const init = async () => {
    const getData = await getRequest({ url: `/users/${username}` });
    setFormData({
      ...getData,
    });
  };
  useEffect(() => {
    init();
  }, []);
  const onSubmit = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    await patchRequest({ url: `/users/user/${formData.id}`, body: formData });
    navigate("/users");
  };
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">Edit user</h1>
      <Form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-4">
        <div>
          <div className="mb-1 block">
            <Label htmlFor="username1" value="Users Username" />
          </div>
          <TextInput
            id="username1"
            type="text"
            placeholder="Username"
            name="username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="username1" value="Users First Name" />
          </div>
          <TextInput
            id="username1"
            type="text"
            placeholder="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="username1" value="Users Last Name" />
          </div>
          <TextInput
            id="username1"
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="username1" value="Users Password" />
          </div>
          <TextInput
            id="username1"
            type="text"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default EditUser;
