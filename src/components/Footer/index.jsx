import { parentVariants, transition } from "@/animation/transition";
import useDB from "@/hooks/useDB";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "../TextMask";
import KeluargaBesar from "./KeluargaBesar";

/**
 * Text variant
 */
const textVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
    skewY: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Text variant
 */
const dividerVariants = {
  hidden: {
    scaleX: 0,
    originX: 0.5,
  },
  show: {
    scaleX: 1,
    originX: 0.5,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Footer komponen
 */
const Footer = () => {
  const { pria, wanita } = useDB((db) => db.wedding.mempelai);
const doaRestu = "Lời chúc phúc của Quý vị là món quà vô giá đối với chúng tôi.";
const berbahagia = "Chúng tôi hạnh phúc vô cùng";


  return (
    <Box
      component={motion.div}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
      py={18}
    >
      <Container>
        <Grid
          container
          spacing={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontFamily: "Arizonia" }}
            >
              {doaRestu.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          <Grid item xs={12} mb={5}>
            <Divider
              sx={{ my: 5 }}
              component={motion.div}
              variants={dividerVariants}
            >
              <FavoriteTwoToneIcon sx={{ fontSize: 50 }} />
            </Divider>

            <Typography
              variant="h2"
              sx={{ textAlign: "center", fontFamily: "Arizonia" }}
            >
              {berbahagia.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          {/* Mempelai pria */}
          <Grid item md={6} xs={12}>
            <KeluargaBesar
              title="Họ nhà Trai"
              orangTuaPria={pria.orangTua.pria}
              orangTuaWanita={pria.orangTua.wanita}
            />
          </Grid>

          {/* Mempelai wanita */}
          <Grid item md={6} xs={12} sx={{ mt: { md: 0, xs: 5 } }}>
            <KeluargaBesar
              title="Họ nhà Gái"
              orangTuaPria={wanita.orangTua.pria}
              orangTuaWanita={wanita.orangTua.wanita}
            />
          </Grid>
        </Grid>
        {/* QR Code */}
<Grid item xs={12} mt={10} textAlign="center">
  <Box
    component="img"
    src="/assets/images/QR.jfif" // thay bằng đường dẫn QR code của bạn
    alt="QR Code"
    sx={{
      width: { xs: 200, md: 250 },
      height: "auto",
      mx: "auto",
      borderRadius: 4,
      boxShadow: 3,
    }}
  />
  <Typography variant="h6" mt={2} sx={{ fontFamily: "Arizonia" }}>
    Quét mã để gửi lời chúc
  </Typography>
</Grid>

      </Container>
    </Box>
  );
};

export default Footer;
