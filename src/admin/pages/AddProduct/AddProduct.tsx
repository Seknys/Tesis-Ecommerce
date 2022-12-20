import { DocumentData } from "firebase/firestore";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icategories, Iproducts, ITags } from "../../../interfaces/interface";
import { getCategories } from "../../../services/basicOperations";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import CreatableSelect from "react-select/creatable";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { addProduct, getUrlImage, uploadImage } from "../../../services/admin";

import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { deleteProduct, getProductByUid } from "../../../services/products";

const colourOptions: ITags[] = [
  { value: "chaning", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

export default function AddProduct() {
  const { uid } = useParams<{ uid: string }>();
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [categorySelected, setCategory] = useState<string>("");
  const isValid = useRef(true);
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{
    name?: string;
    category?: string;
    img?: string;
    price?: string;
    desc?: string;
    stock?: string;
    tags?: string[];
    feat?: string[];
  }>({});

  const [feat, setFeat] = useState<string[]>([]);
  // const feats = useRef<any>([]);
  const [inputFeat, setInputFeat] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<ITags[]>();
  const [selectedTags, setSelectedTags] = useState<string[]>();

  const [arrayImages, setArrayImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // console.log("UID:", uuidv4());
    const getCategoriesSnapshot = (snapshot: DocumentData) => {
      const categoriesData = snapshot.docs.map((doc: DocumentData) =>
        doc.data()
      );
      setCategories(categoriesData);
    };
    getCategories(getCategoriesSnapshot);
    setTags(colourOptions);

    const getProductByUidSnapshot = (snapshot: DocumentData) => {
      const productData = snapshot.data();
      console.log("DAta", productData);
      setName(productData.name);
      setImg(productData.img);
      setPrice(productData.price);
      setStock(productData.stock);
      setDesc(productData.desc);
      setCategory(productData.category);
      setSelectedTags(productData.tags);
      setFeat(productData.feat);
      setArrayImages(productData.images);
    };
    if (uid) {
      getProductByUid(uid, getProductByUidSnapshot);
    }
  }, []);
  // setTags([
  //   { label: "One", value: "one" },
  //   { label: "Two", value: "two" },
  // ]);

  const handleTagsChange = async (options: any, actionMeta: any) => {
    if (actionMeta.action === "create-option") {
      console.log("ACTION META?", actionMeta.option);
      //await addTag(tags.concat(options[options.length - 1].value));
      // setTags(tags.concat(options[options.length - 1].value));
    }

    if (options) {
      let newtags: string[] = [];
      options.map((option: any) => {
        newtags?.push(option.value);
      });

      // setSelectedTags(newtags);
      // console.log("SELECTED TAGS", selectedTags);

      setSelectedTags(newtags);
    } else {
      // setSelectedTags(null);
    }
  };

  const getUploadParams = ({ meta }: any) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }: any, status: any) => {
    setStatus(status);
    console.log(status, meta);
  };

  const handleSubmitImage = (files: any, allFiles: any) => {
    let array: string[] = [];
    files.map((f: any, index: number) => {
      uploadImage(f.file).then((url) => {
        getUrlImage(url.ref.fullPath).then((url) => {
          array.push(url);
        });
      });
    });
    allFiles.forEach((f: any) => f.remove());
    setArrayImages(array);
  };

  const addItem = (title: string) => {
    if (title === "") {
      // toast.show({
      //   title: "Please Enter Text",
      //   status: "warning",
      // });
      console.log("IS EMPTY");
      return;
    }

    setFeat((prevList: string[]) => {
      return [...prevList, title];
    });
  };
  const handleDelete = (index: number) => {
    setFeat((prevList) => {
      const temp = prevList?.filter((_, itemI) => itemI !== index);
      return temp;
    });
    // feats.current.splice(index, 1);
  };

  const handleAddProduct = (cat: Icategories) => {
    const uid: any = uuidv4().substring(0, 8);
    console.log("UID:", uid);
    setIsLoading(true);
    if (isValid.current) {
      console.log("Valid");
      const newProductData: Iproducts = {
        catUid: cat.uid,
        category: cat.name,
        desc: desc,
        img: arrayImages,
        name: name,
        price: parseInt(price),
        stock: parseInt(stock),
        tags: selectedTags,
        feat: feat,
        uid: uid,
        views: 0,
        addedToCart: 0,
        // tags: selectedTags,
      };
      console.log("New Product: ", newProductData);

      addProduct(newProductData).then((res) => {
        console.log("PRODUCT SUCCESFULLY ADDED: ", res);
        setName("");
        setCategory("");
        setImg("");
        setPrice("");
        setStock("");
        setDesc("");
        setTags([]);
        setFeat([]);
        setArrayImages([]);
        setIsLoading(false);
      });
    }
    setIsLoading(false);
  };

  const handleUpdateProduct = (cat: Icategories) => {
    setIsLoading(true);
  };
  const handleDeleteProduct = () => {
    setIsLoading(true);

    deleteProduct(uid).then((res) => {
      console.log("PRODUCT SUCCESFULLY DELETED: ", res);
      setName("");
      setCategory("");
      setImg("");
      setPrice("");
      setStock("");
      setDesc("");
      setTags([]);
      setFeat([]);
      setArrayImages([]);
      setIsLoading(false);
    });
  };

  return (
    <>
      {uid && (
        <Box alignSelf={"flex-end"}>
          <Button bg="danger.400" onPress={handleDeleteProduct}>
            <Text>Eliminar producto</Text>
          </Button>
        </Box>
      )}

      <Center w="100%">
        <Box w="45%" my="10%">
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmitImage}
            accept="image/*"
            inputContent={(files, extra) =>
              extra.reject ? (
                <Box>
                  <Text fontSize={"2xl"} color="blue.600">
                    Images Only
                  </Text>
                </Box>
              ) : (
                <Box>
                  <Text fontSize={"2xl"} color="blue.600">
                    Drag and drop images
                  </Text>
                </Box>
              )
            }
            styles={{
              dropzone: { minHeight: 200, maxHeight: 250 },
            }}
          />
          {/* <Dropzone
            getUploadParams={getUploadParams}
            //   onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmitImage}
            accept="image/*"
            inputContent={(files, extra) =>
              extra.reject ? (
                <Box>
                  <Text fontSize={"2xl"} color="red.600">
                    Images Only
                  </Text>
                </Box>
              ) : (
                <Box>
                  <Text fontSize={"2xl"} color="red.600">
                    Drag and drop images
                  </Text>
                </Box>
              )
            }
            styles={{
              dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
              inputLabel: (files, extra) =>
                extra.reject ? { color: "red" } : {},
            }}
          /> */}
          <FormControl isRequired isInvalid={errors.name != undefined}>
            <Input
              size="xl"
              // mb="19"
              value={name}
              borderBottomWidth="3"
              placeholder={"NAME"}
              placeholderTextColor="black"
              onChangeText={(nameTxt: string) => {
                setName(nameTxt);
                if (nameTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    name: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    name: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
            />
            {errors.name != undefined ? (
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Select
            selectedValue={categorySelected}
            onValueChange={(itemValue) => setCategory(itemValue)}
            placeholder="Select Category"
            accessibilityLabel="Select Category"
          >
            {categories.map((category) => (
              <Select.Item
                label={category.name}
                value={category.uid}
                key={category.uid}
              />
            ))}
          </Select>

          <FormControl isRequired isInvalid={errors.desc != undefined}>
            <TextArea
              value={desc}
              size="xl"
              mb="19"
              borderBottomWidth="3"
              placeholder={"Desc"}
              isInvalid={errors.desc != undefined}
              placeholderTextColor="black"
              onChangeText={(descTxt: string) => {
                setDesc(descTxt);
                if (descTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    desc: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    desc: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
            />
            {errors.desc != undefined ? (
              <FormControl.ErrorMessage>{errors.desc}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={errors.price != undefined}>
            <input
              type="number"
              min="1"
              max="10"
              value={price}
              placeholder="Price"
              onChange={(priceTxt) => {
                setPrice(priceTxt.target.value);

                if (priceTxt.target.value.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    price: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    price: undefined,
                  }));
                  isValid.current = true;
                }
              }}
            />

            {errors.price != undefined ? (
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={errors.stock != undefined}>
            <input
              type="number"
              min="1"
              max="10"
              value={stock}
              placeholder="Stock"
              onChange={(stockTxt) => {
                setStock(stockTxt.target.value);

                if (stockTxt.target.value.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    stock: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    stock: undefined,
                  }));
                  isValid.current = true;
                }
              }}
            />

            {errors.stock != undefined ? (
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <CreatableSelect isMulti options={tags} onChange={handleTagsChange} />

          <VStack space={4}>
            <HStack space={2}>
              <Input
                flex={1}
                onChangeText={setInputFeat}
                value={inputFeat}
                placeholder="Add Task"
              />
              <IconButton
                borderRadius="sm"
                variant="solid"
                icon={
                  <Icon
                    as={AiFillPlusCircle}
                    name="plus"
                    size="sm"
                    color="warmGray.50"
                  />
                }
                onPress={() => {
                  addItem(inputFeat);
                  setInputFeat("");
                }}
              />
            </HStack>
            <VStack space={2}>
              {feat?.map((item: string, itemI: number) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={item + itemI.toString()}
                >
                  {/* <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                ></Checkbox> */}
                  <Text
                    width="100%"
                    flexShrink={1}
                    textAlign="left"
                    mx="2"
                    // strikeThrough={item.isCompleted}
                    // _light={{
                    //   color: item.isCompleted ? "gray.400" : "coolGray.800",
                    // }}
                    // _dark={{
                    //   color: item.isCompleted ? "gray.400" : "coolGray.50",
                    // }}
                    // onPress={() => handleStatusChange(itemI)}
                  >
                    {item}
                  </Text>
                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={AiFillMinusCircle}
                        name="minus"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => handleDelete(itemI)}
                  />
                </HStack>
              ))}
            </VStack>
          </VStack>

          <Button
            onPress={() => {
              categories.map((category: Icategories) => {
                if (category.uid === categorySelected) {
                  handleAddProduct(category);
                }
              });
            }}
          >
            <Text fontSize="2xl">UPLOAD</Text>
          </Button>
        </Box>
      </Center>
    </>
  );
}
