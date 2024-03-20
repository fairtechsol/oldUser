import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, drawerBackground } from "../../../assets/index";

const SideBar = ({ mobileShow,handleDrawerToggle }: any) => {
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("All Sports");
  const data = [
    {
      title: "All Sports",
      data: [
        { title: "In Play", url: "/inplay", activeTab: "INPLAY" },
        {
          title: "Cricket",
          url: "/match",
          activeTab: "CRICKET",
          matchType: "cricket",
        },
        {
          title: "Live Casino",
          url: "/comingsoon",
          activeTab: "LIVE CASINO",
        },
        {
          title: "Live Card",
          url: "/comingsoon",
          activeTab: "LIVE CARD",
        },
        { title: "soccer", url: "/comingsoon", activeTab: "TENNIS" },
        {
          title: "Ice Hockey",
          url: "/comingsoon",
          activeTab: "ICE HOCKEY",
        },
        { title: "Volleyball", url: "/comingsoon" },
        { title: "Politics", url: "/comingsoon" },
        { title: "Table", url: "/comingsoon" },
        { title: "Darts", url: "/comingsoon" },
        { title: "Snooker", url: "/comingsoon", activeTab: "SNOOKER" },
        { title: "Golf", url: "/comingsoon", activeTab: "GOLF" },
        { title: "Chess", url: "/comingsoon", activeTab: "CHESS" },
        {
          title: "Basketball",
          url: "/comingsoon",
          activeTab: "BASKETBALL",
        },
      ],
    },
    {
      title: "Others",
      data: [],
    },
  ];
  const ListHeader = ({ title }: any) => {
    return (
      <Box
        onClick={() => {
          if (selected == title) {
            setSelected("");
          } else {
            setSelected(title);
          }
        }}
        sx={[
          {
            width: "100%",
            height: "6vh",
            marginBottom: ".5vh",
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
          },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ display: "flex", flex: 0.3 }}></Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              height: "100%",
              justifyContent: { xs: "flex-start", lg: "center" },
              alignItems: "center",
            }}
          >
            <Typography
              //   variant="menuListHeader"
              sx={{
                fontSize: {
                  lg: showSideBarMobile ? "18px" : "16px",
                  xs: "20px",
                },
                fontWeight: { xs: "500", lg: "600" },
              }}
              color={"white"}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "15px",
                height: "8px",
                transform:
                  selected == title ? "rotate(0deg)" : "rotate(180deg)",
              }}
              src={ArrowDown}
              alt=""
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const ListItem = ({ item }: any) => {
    return (
      <Box
        onClick={() => {
          navigate(item?.url, { state: { activeTab: item?.activeTab } });
          handleDrawerToggle()

          setShowSideBarMobile(false)
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "5vh",
          minHeight: "20px",
          width: { xs: "100%", lg: "100%" },
          color: "white",
          "&:hover": {
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "5%", lg: "40%", md: "8%" },
          }}
        ></Box>
        <Typography
          //   variant="menuListItem"
          sx={{
            fontSize: {
              lg: showSideBarMobile ? "15px" : "13px",
              xs: "20px",
            },
            marginLeft: { xs: "35px", lg: "0px" },
            cursor: "pointer",
          }}
        >
          {item.title}
        </Typography>
      </Box>
    );
  };

  const RenderList = ({ data }: any) => {
    return data.map((item: any, idx: any) => {
      return (
        <ListItem
          key={idx}
          item={item}
          setShowSideBarMobile={setShowSideBarMobile}
        />
      );
    });
  };
  const RenderItem = ({ i }: any) => {
    return (
      <>
        <ListHeader title={i.title} />
        {selected == i.title && <RenderList data={i.data} />}
      </>
    );
  };

  return (
    <Box
      sx={[
        {
          width: {
            lg: showSideBarMobile ? "100%" : "18%",
            xs: mobileShow ? "100%" : "0%",
          },
          minHeight: "500px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          alignItems: { xs: "flex-start", lg: "flex-end" },
          backgroundImage: `url(${drawerBackground})`,
        },
      ]}
    >
      {data?.map((i, idx) => {
        return <RenderItem key={idx} i={i} />;
      })}
    </Box>
  );
};

export default SideBar;
