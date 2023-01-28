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
import {
  deleteProduct,
  getProductByUid,
  updateProduct,
} from "../../../services/products";
import {
  ErrorToastAdmin,
  SuccesToastAdmin,
  ToastC,
  WariningToastAdmin,
} from "../../../components/Toast";
import ModalConfirm from "../../components/ModalConfirm";
import SelectCategory from "../../components/SelectComponent";
import Tooltip from "@mui/material/Tooltip";
import { async } from "@firebase/util";

const colourOptions: ITags[] = [
  { value: "chaning", label: "Computadora" },
  { value: "blue", label: "Impresoras" },
  { value: "purple", label: "Laptops" },
  { value: "red", label: "Monitores" },
  { value: "orange", label: "Tarjetas Gráficas" },
  { value: "yellow", label: "Teclados" },
  { value: "green", label: "Nvidia" },
  { value: "forest", label: "AMD" },
  { value: "slate", label: "2022" },
  { value: "silver", label: "Nuevo" },
];

export default function AddProduct({ history }: any) {
  const uidSub: any = uuidv4().substring(0, 8);
  const { uid } = useParams<{ uid: string }>();
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [categorySelected, setCategory] = useState<string>();
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
  const [tags, setTags] = useState<any>();
  const [selectedTags, setSelectedTags] = useState<any>();

  const [arrayImages, setArrayImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [product, setProduct] = useState<Iproducts>();

  useEffect(() => {
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

      setName(productData.name);
      setImg(productData.img);
      setPrice(productData.price);
      setStock(productData.stock);
      setDesc(productData.desc);
      setCategory(productData.catUid);
      setSelectedTags(productData.tags);
      setFeat(productData.feat);
      setArrayImages(productData.images);
      setProduct(productData);
    };
    if (uid) {
      getProductByUid(uid, getProductByUidSnapshot);
    }
  }, []);

  const handleTagsChange = async (options: any, actionMeta: any) => {
    if (actionMeta.action === "create-option") {
      //await addTag(tags.concat(options[options.length - 1].value));
      // setTags(tags.concat(options[options.length - 1].value));
    }

    if (options) {
      let newtags: any = [];
      options.map((option: any) => {
        newtags?.push({ label: option.label, value: option.value });
      });

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
  };

  const handleSubmitImage = async (files: any, allFiles: any) => {
    let array: string[] = [];

    for (const fileImg of files) {
      console.log("FILES:", fileImg.file.name);
      await uploadImage(fileImg.file, uid ? uid : uidSub).then(async (url) => {
        await getUrlImage(url.ref.fullPath).then((url) => {
          console.log("URL:", url);
          array.push(url);
        });
      });
    }
    allFiles.forEach((f: any) => f.remove());
    console.log("ARRAY:", array);

    setArrayImages(array);
    setIsEnable(false);
  };

  const addItem = (title: string) => {
    if (title === "") {
      // toast.show({
      //   title: "Please Enter Text",
      //   status: "warning",
      // });

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
    // const uid: any = uuidv4().substring(0, 8);

    setIsLoading(true);
    if (isValid.current) {
      const newProductData: Iproducts = {
        catUid: cat.uid,
        category: cat.name,
        desc: desc,
        img: arrayImages,
        name: name,
        price: parseFloat(price),
        stock: parseFloat(stock),
        tags: selectedTags,
        feat: feat,
        uid: uidSub,
        views: 0,
        addedToCart: 0,
        removeToCart: 0,
        buy: 0,
        // tags: selectedTags,
      };

      addProduct(newProductData)
        .then((res) => {
          SuccesToastAdmin("Product Added");

          setName("");
          setCategory("");
          setImg([]);
          setPrice("");
          setStock("");
          setDesc("");
          setTags([]);
          setFeat([]);
          setArrayImages([]);
          setIsLoading(false);
          setTimeout(() => {
            history.push("/home");
          }, 2500);
        })
        .catch((err) => {
          ErrorToastAdmin(`Error ${err.message}`);

          setIsLoading(false);
        });
    }
    setIsLoading(false);
  };

  const handleUpdateProduct = (cat: Icategories) => {
    setIsLoading(true);

    if (product) {
      const updateProductData: Iproducts = {
        catUid: cat.uid,
        category: cat.name,
        desc: desc,
        img: arrayImages ? arrayImages : img,
        name: name,
        price: parseFloat(price),
        stock: parseFloat(stock),
        tags: selectedTags,
        feat: feat,
        uid: uid,
        views: product.views,
        addedToCart: product.addedToCart,
        removeToCart: product.removeToCart,
        buy: product.buy,
        // tags: selectedTags,
      };

      updateProduct(uid, updateProductData)
        .then((res) => {
          SuccesToastAdmin("Product Updated");

          setTimeout(() => {
            history.goBack();
          }, 2000);
        })
        .catch((err) => {
          ErrorToastAdmin(`Error ${err.message}`);

          setIsLoading(false);
        });
    }
  };
  const handleDeleteProduct = () => {
    setIsLoading(true);

    deleteProduct(uid).then((res) => {
      WariningToastAdmin("Product Deleted");

      setName("");
      setCategory("");
      setImg([]);
      setPrice("");
      setStock("");
      setDesc("");
      setTags([]);
      setFeat([]);
      setArrayImages([]);
      setIsLoading(false);
      setTimeout(() => {
        history.goBack();
      }, 2000);
    });
  };

  return (
    <>
      <ToastC />
      {uid && (
        <Box
          m="5"
          alignSelf={"flex-end"}
          position="sticky"
          top="100px"
          right="45px"
        >
          <Button
            bg="danger.600"
            onPress={() => {
              setShowModal(true);
            }}
            _hover={{
              bg: "danger.500",
            }}
          >
            <Text color="white" fontSize={"lg"} bold>
              Eliminar producto
            </Text>
          </Button>
        </Box>
      )}

      <Center w="100%">
        <Box w="45%" my="4%">
          <Text
            mb="10px"
            textAlign={"center"}
            bold
            fontSize={"2xl"}
            color="red.500"
          >
            {uid ? "Añadir un nuevo producto" : "Actualizar Producto"}
          </Text>
          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Nombre
            </Text>
          </HStack>
          <FormControl isRequired isInvalid={errors.name != undefined}>
            <Input
              size="xl"
              // mb="19"
              value={name}
              borderBottomWidth="3"
              placeholder={"Nombre"}
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
          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Imagenes
            </Text>
            <Text ml="4">(*Subir imagenes antes de subir el producto)</Text>
          </HStack>

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

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Seleccionar Categoria
            </Text>
          </HStack>

          <SelectCategory
            setCategory={setCategory}
            category={categorySelected}
            categoryArray={categories}
          />

          {/* <Select
          
            selectedValue={"categorySelected"}
            onValueChange={(itemValue) => {
              console.log("ITemValueCat: ", itemValue);
              setCategory(itemValue);
            }}
            placeholder="Select Category"
            accessibilityLabel="Select Category"
          >
            {categories.map((category) => (
              <Select.Item
                label={category.name}
                value={category.uid}
                key={category.uid + category.name}
              />
            ))}
          </Select> */}

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Descripción del produto
            </Text>
          </HStack>

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

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Precio $$$
            </Text>
          </HStack>

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

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Stock del producto
            </Text>
          </HStack>

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

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Tags del producto
            </Text>
          </HStack>

          <CreatableSelect
            value={selectedTags}
            isMulti
            options={tags}
            onChange={handleTagsChange}
          />

          <HStack
            py="3"
            px="5"
            my="5"
            bg="gray.100"
            shadow={5}
            alignItems="center"
          >
            <Text bold fontSize={"xl"}>
              Caracteristicas
            </Text>
            <Text ml="4">(Opcional)</Text>
          </HStack>

          <VStack space={4}>
            <HStack space={2}>
              <Input
                flex={1}
                onChangeText={setInputFeat}
                value={inputFeat}
                placeholder="Añadir caracteristica"
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

          {/* <Box> */}

          {uid ? (
            <Button
              alignSelf={"center"}
              bg="blue.500"
              _hover={{
                bg: "blue.600",
              }}
              onPress={() => {
                categories.map((category: Icategories) => {
                  if (category.uid === categorySelected) {
                    handleUpdateProduct(category);
                  }
                });
              }}
            >
              <Text fontSize="2xl" color="white">
                Actualizar Producto
              </Text>
            </Button>
          ) : (
            <Tooltip
              placement="right"
              title="Recuerda subir las imagenes primero"
            >
              <Button
                isDisabled={isEnable}
                alignSelf={"center"}
                bg="gray.700"
                _hover={{
                  bg: "gray.600",
                }}
                onPress={() => {
                  categories.map((category: Icategories) => {
                    if (category.uid === categorySelected) {
                      handleAddProduct(category);
                    }
                  });
                }}
              >
                <Text fontSize="2xl" color="white">
                  Subir Producto
                </Text>
              </Button>
            </Tooltip>
          )}

          {/* </Box> */}
        </Box>
      </Center>

      {showModal && (
        <ModalConfirm
          showModal={showModal}
          setShowModal={setShowModal}
          handleDeteleProduct={handleDeleteProduct}
        />
      )}
    </>
  );
}
