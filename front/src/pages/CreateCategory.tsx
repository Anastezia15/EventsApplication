import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { postRequest } from "../api";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await postRequest({
      url: "/categories/admin",
      body: { name, description: "" },
    });
    navigate("/");
  };
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">
        Create Category
      </h1>
      <Form onSubmit={onSubmit} className="flex w-[25%] flex-col gap-[15px]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Category name" />
          </div>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="email1"
            type="text"
            placeholder="Category name"
            required
          />
        </div>
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreateCategory;
