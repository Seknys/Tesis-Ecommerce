import React, { useEffect, useState } from "react";
import SideBarMenu from "../../../components/SidebarMenu";
import {
  Icategories,
  IComments,
  Iproducts,
} from "../../../interfaces/interface";
import { Box, Center, Text } from "native-base";
import {
  getCommetsbyProduct,
  getProductsByCategory,
} from "../../../services/products";
import { DocumentData } from "firebase/firestore";
import ApexCharts from "apexcharts";
import "./style.css";
import ReactApexChart from "react-apexcharts";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { getCommentsByProductStatic } from "../../../services/admin";
import { connect } from "net";

// const config = {
//   options: {
//     chart: {
//       type: "bar",
//       height: 350,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "55%",
//         endingShape: "rounded",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: [
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//       ],
//     },
//     yaxis: {
//       title: {
//         text: "$ (thousands)",
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     // tooltip: {
//     //   y: {
//     //     formatter: function (val) {
//     //       return "$ " + val + " thousands";
//     //     },
//     //   },
//     // },
//   },
//   series: [
//     {
//       name: "Net Profit",
//       data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
//     },
//     {
//       name: "Revenue",
//       data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
//     },
//     {
//       name: "Free Cash Flow",
//       data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
//     },
//   ],
// };

export const AnalysisxCat = () => {
  const [categoryUid, setCategoryUid] = useState<Icategories>();
  const [categories, setCategories] = useState<Icategories[]>();
  const [products, setProducts] = useState<Iproducts[]>();

  const [option, setOption] = useState<number[]>([]);
  const [name, setName] = useState<string[]>([]);
  const [pieValues, setPieValues] = useState<number[]>([]);
  const [boxValue, setBoxValue] = useState<any>("views");
  const [comentsLenght, setComentsLenght] = useState<any>(0);
  const [boxName, setBoxName] = useState<string>("Views");

  //Set arrays for chart

  const config = {
    series: [
      {
        name: boxName,
        data: option,
      },
    ],

    options: {
      //   chart: {
      //     zoom: {
      //       enabled: false,
      //     },
      //   },
      colors: ["#AD8BD5"],
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      //   stroke: {
      //     curve: "straight",
      //   },
      title: {
        text: `${boxName} de productos por categoría`,
        floating: true,
        offsetY: 330,

        style: {
          color: "#444",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: name,
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },

      //   fill: {
      //     opacity: 0,
      //   },
      //   markers: {
      //     size: 2,
      //   },
    },
  };

  const pie = {
    series: pieValues,
    options: {
      chart: {
        width: 480,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      labels: [
        "Views",
        "Add to Cart",
        "Remove to Cart",
        "Comments",
        "Times Buyed",
      ],
      fill: {
        type: "gradient",
      },
      //   legend: {
      //     formatter: function (val: any, opts: any) {
      //       return val + " - " + opts.w.globals.series[opts.seriesIndex];
      //     },
      //   },
      title: {
        text: "Estadisticas generales de la categoría",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (categoryUid) {
      const getProductSnapshot = async (snapshot: DocumentData) => {
        const productsData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );
        setProducts(productsData);

        if (productsData) {
          let viewsArray: number[] = [];
          let nameArray: string[] = [];
          let pieArray: number[] = [];
          let viewsSum = 0;
          let addCartSum = 0;
          let removeToCartSum = 0;
          let commentsSum = 0;
          let buySum = 0;

          for (const product of productsData) {
            // getCommetsbyProduct(product.uid, commetsByProductFunction);
            nameArray.push(product.name);
            viewsArray.push(product.views);
            viewsSum += product.views;
            addCartSum += product.addedToCart;
            removeToCartSum += product.removeToCart;
            buySum += product.buy;
            await getCommentsByProductStatic(product.uid).then((res) => {
              // res.forEach((doc) => {
              commentsSum += res.docs.length;
              //   // console.log("commentsSum: ", commentsSum);
              //   setComentsLenght(commentsSum);

              //   console.log("RES DOC: ", doc.data());
              // });
          
            });
          }

          // const commetsByProductFunction = (commets: IComments[]) => {
          //   if (commets.length > 0) {
          //     console.log(
          //       "Comments For of: ",
          //       commets[0].userName,
          //       commets.length
          //     );
          //     commentsSum += commets.length;
          //     setComentsLenght(commentsSum);
          //   }
          // };
          // productsData.forEach((product: Iproducts) => {

          //   getCommentsByProductStatic(product.uid).then((res) => {
          //     res.forEach((doc) => {
          //       commentsSum++;
          //       // console.log("commentsSum: ", commentsSum);
          //       setComentsLenght(commentsSum);

          //       console.log("RES DOC: ", doc.data());
          //     });
          //   });
          // });

          setPieValues([
            viewsSum,
            addCartSum,
            removeToCartSum,
            commentsSum,
            buySum,
          ]);

          setOption(viewsArray);
          setName(nameArray);
        }
      };
      getProductsByCategory(categoryUid.uid, getProductSnapshot);
      setBoxValue("views");
    }
  }, [categoryUid]);

  useEffect(() => {

  }, [comentsLenght]);

  useEffect(() => {
    if (products) {
      let optionsArray: number[] = [];
      const optionComent = async () => {
        for (const product of products) {
          await getCommentsByProductStatic(product.uid).then((res) => {
            optionsArray.push(res.docs.length);
          });
        }
      };

      if (boxValue === "comments") {
        optionComent();
        setBoxValue("comments");
      } else {
        products.forEach((product: any) => {
          optionsArray.push(product[boxValue]);
        
        });
      }

      setOption(optionsArray);
    }
  }, [boxValue]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let auxName = "";

    setBoxValue((event.target as HTMLInputElement).value);
    switch ((event.target as HTMLInputElement).value) {
      case "views":
        auxName = "Views";
        break;
      case "addedToCart":
        auxName = "Added to Cart";
        break;
      case "removeToCart":
        auxName = "Removed to Cart";
        break;

      case "buy":
        auxName = "Purchased";
        break;
      default:
        break;
    }
    setBoxName(auxName);
  };

  return (
    <>
      <SideBarMenu callBackParent={setCategoryUid}>
        {/* <div>
            <h3>{categoryUid} trext</h3>
          </div> */}

        {categoryUid ? (
          <>
            <Center>
              <Text bold fontSize={"3xl"}>
                Categoria: {categoryUid.name}
              </Text>
            </Center>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={boxValue}
                onChange={handleOnChange}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="views"
                  control={<Radio />}
                  label="Views"
                />
                <FormControlLabel
                  value="addedToCart"
                  control={<Radio />}
                  label="Added to Cart"
                />
                <FormControlLabel
                  value="removeToCart"
                  control={<Radio />}
                  label="Removed to Cart"
                />
                <FormControlLabel
                  value="buy"
                  control={<Radio />}
                  label="Purchased"
                />
                {/* <FormControlLabel
                  value="comments"
                  control={<Radio />}
                  label="Comments"
                /> */}
              </RadioGroup>
            </FormControl>
            <Box
              mx="30px"
              // borderWidth={3}
              // borderColor="black"
              // borderRadius={25}
            >
              <ReactApexChart
                options={config.options}
                series={config.series}
                type="bar"
                height="350"
                // width={600}
              />
            </Box>
            <Box w="100%" mt="30px" alignItems={"center"}>
              <ReactApexChart
                options={pie.options}
                series={pie.series}
                type="donut"
                width={480}
              />
            </Box>
          </>
        ) : (
          <Center h="500px">
            <Text bold fontSize={"3xl"}>
              Seleccione una categoria para Empezar
            </Text>
          </Center>
        )}

        {/* <Text>Vistas</Text> */}

        {/* <Text>Productos</Text> */}
      </SideBarMenu>
    </>
  );
};
