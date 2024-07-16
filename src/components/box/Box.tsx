"use client";

import React from "react";
import { motion } from "framer-motion";

import MuiBox, { BoxProps } from "@mui/material/Box";

const BoxComponent = React.forwardRef((props: BoxProps, ref) => <MuiBox {...props} ref={ref} />);

BoxComponent.displayName = 'BoxComponent'

const Box = motion(BoxComponent);


export default Box;
