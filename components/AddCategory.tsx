"use client";
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import cybersify from "@/lib/cybersifyApi";
const AddCategory = () => {
  const [category, setCategory] = useState<any>("");
  const onchange = (event: any) => {
    const value = event.target.value;
    console.log(value, "inputvalue");
    setCategory(value);
  };
  //   collection_uri
  //   collection_title
  //   collection_description
  //   is_visible_home
  const submit = async () => {
    let item = {
      collection_image: "",
      collection_uri: "birthday",
      collection_title: "birthday",
      collection_description: "birthdaybirthdaybirthdaybirthdaybirthdaybirthdaybirthdaybirthdaybirthdaybirthday",
      is_visible_home: 0,
    };
    const res = await cybersify.Admin.create(item);
    console.log(res, "res");
  };
  return (
    <div className="container ">
      <div className="row mt-5 ">
        <div className="col-md-6 gap-3">
          <div className="mt-2">
            <Label>Category Name</Label>
            <Input
              name="collection_title"
              style={{ width: "570px" }}
              onChange={onchange}
            />
          </div>
          <div className="mt-2">
          <Label>Category Url</Label>
            <Input
              name="collection_uri"
              style={{ width: "570px" }}
              onChange={onchange}
            />
          </div>
          <div className="mt-2">
          <Label>Description</Label>
            <Input
              name="collection_description"
              style={{ width: "570px" }}
              onChange={onchange}
            />
          </div>
          <div className="mt-2">
          <Label>qwertyu</Label>
            <Input
              name="category"
              style={{ width: "570px" }}
              onChange={onchange}
            />
          </div>
          <div className="mt-2">
          <Label>qwertyu</Label>
            <Input
              name="category"
              style={{ width: "570px" }}
              onChange={onchange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <Button onClick={submit}>add</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
