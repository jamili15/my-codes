"use client";

import React from "react";
import { createPost } from "@/_actions/postActions";
import Form from "../io/Form";

import ObjText from "../io/ObjText";
import ArrayObjText from "../io/ArrayObjText";
import ArrayField from "../io/ArrayText";
import { Text } from "@/components/lib-components/io/Text";

const CreateCrendentials = () => {
  const onSubmit = async (
    formValues: Record<string, any>,
    form: Record<string, any>
  ) => {
    await createPost(formValues);
    window.alert(JSON.stringify(formValues, null, 2));
    console.log("FormValues", JSON.stringify(formValues, null, 2));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ submitting, pristine, form, values }) => (
        <>
          <Text name="firstname" label="First Name" variant="outlined" />
          <Text name="lastname" label="Last Name" variant="outlined" />
          <Text name="age" label="Age" variant="outlined" />
          <ObjText
            name="account"
            valueKeys={["username", "email", "password"]}
            labels={{
              username: "User Name",
              email: "Email Address",
              password: "Password",
            }}
          />
          <ArrayObjText
            name="colors"
            valueKeys={[
              ["yellow", "pink", "black"],
              ["yellow", "pink", "black"],
            ]}
            labels={{
              red: "Red",
              blue: "Blue",
              green: "Green",
              yellow: "Yellow",
              pink: "Pink",
              black: "Black",
            }}
          />

          <ArrayField
            name="favoriteFoods"
            valueKeys={["0", "1", "2"]}
            labels={{ 0: "crab", 1: "hotdog", 2: "chicken" }}
          />

          <pre>{JSON.stringify(values, null, 2)}</pre>
          <button type="submit">Submit</button>
        </>
      )}
    />
  );
};

export default CreateCrendentials;
