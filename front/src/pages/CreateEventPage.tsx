import {
  Button,
  Card,
  Datepicker,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { formatDateTime, getCurrentDateTime } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user.store";
import { useAllEventsStore } from "../store/allEvents.store";
import { getRequest, postRequest } from "../api";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [options, setOptions] = useState<{ name: string }[]>([]);
  const defaltDate = getCurrentDateTime();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    date: defaltDate.date,
    time: "",
    category: "Music",
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
  const handleDateChange = (date: any) => {
    const dataTime = formatDateTime(date);
    setFormData({
      ...formData,
      date: dataTime.date,
    });
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      value = value.replace(/\D/g, "");
      const hours = parseInt(value.slice(0, 2), 10);
      if (hours < 0 || hours > 24) {
        value = value.slice(0, 2);
      }
      const minutes = parseInt(value.slice(2, 4), 10);
      if (minutes < 0 || minutes > 59) {
        value = value.slice(0, 4);
      }
      const seconds = parseInt(value.slice(4, 6), 10);
      if (seconds < 0 || seconds > 59) {
        value = value.slice(0, 5);
      }

      value = value.slice(0, 6);
      value = value.replace(/(..)(?!$)/g, "$1:");

      setFormData({
        ...formData,
        time: value,
      });
    }
  };
  const inputs = [
    {
      htmlFor: "title",
      value: "Title",
      id: "title",
      name: "title",
      type: "text",
      placeholder: "set title",
    },
    {
      htmlFor: "description",
      value: "Description",
      id: "description",
      type: "text",
      name: "description",
      placeholder: "set description",
    },
    {
      htmlFor: "img",
      value: "Image url",
      id: "img",
      name: "imageUrl",
      type: "text",
      placeholder: "set imageUrl",
    },
    {
      htmlFor: "location",
      value: "Location",
      id: "location",
      name: "location",
      type: "text",
      placeholder: "set location",
    },
    {
      htmlFor: "date",
      value: "Date",
      id: "date",
      type: "date",
      name: "date",
      placeholder: "set date",
    },
    {
      htmlFor: "time",
      value: "Time",
      id: "time",
      type: "time",
      name: "time",
      placeholder: "set time",
    },
    {
      htmlFor: "category",
      value: "Category",
      id: "category",
      type: "category",
      name: "category",
      placeholder: "set category",
      options: ["Music", "Sport", "Concert", "Musium"],
    },
  ];
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      ...formData,
      creatorId: user.id,
    };
    await postRequest({ url: "/events", body: data });
    navigate("/");
  };
  const init = async () => {
    const option = await getRequest({ url: "/categories" });
    setOptions(option);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">Create Event</h1>
      <Card className="min-w-[50%]">
        <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          {inputs.map((value) => (
            <div className="w-full">
              <div className="mb-1 block">
                <Label htmlFor={value.htmlFor} value={value.value} />
              </div>
              {value.type === "text" && (
                <TextInput
                  className="w-full"
                  name={value.name}
                  id={value.id}
                  type={value.type}
                  placeholder={value.placeholder}
                  required
                  onChange={handleInputChange}
                />
              )}
              {value.type === "date" && (
                <Datepicker
                  defaultDate={new Date()}
                  name={value.name}
                  onSelectedDateChanged={(date) => handleDateChange(date)}
                  maxDate={new Date()}
                />
              )}
              {value.type === "time" && (
                <TextInput
                  className="w-full"
                  name={value.name}
                  id={value.id}
                  value={formData.time}
                  type="text"
                  placeholder={value.placeholder}
                  required
                  onChange={handleTimeChange}
                />
              )}
              {value.type === "category" && (
                <Select
                  onChange={handleInputChange}
                  name={value.name}
                  id={value.id}
                  required
                >
                  {options.length != 0 &&
                    options.map((option) => <option>{option?.name}</option>)}
                </Select>
              )}
            </div>
          ))}
          <Button type="submit">Create</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateEventPage;
