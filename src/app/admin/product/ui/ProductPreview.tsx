import MuiChip from "@/components/chip/Chip";
import { FIELDS } from "@/components/constants/config";
import { formatToCount, parseToMoney } from "@/components/helper/component";
import { useAppSelector } from "@/redux/services/hooks";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Stack } from "@mui/material";

const ProductFormPreview = () => {
  const { error, ...form } = useAppSelector((state) => state.productFormSlice);

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia component="img" className="max-w-[240px] mx-auto p-4" image="/next.svg" alt="Product Image" />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
            <Typography gutterBottom variant="h5" component="div">
              {form.name || FIELDS.EMPTY_IMPORTANT}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" className="text-end">
              {parseToMoney(form.price)}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {form.description || FIELDS.EMPTY}
            </Typography>
            <Typography variant="subtitle2" className="text-end">
              Stock: {formatToCount(form.stock)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="flex flex-wrap gap-2">
          {form.categories?.map((item) => <MuiChip key={item.id} label={item.name} color="primary" />)}
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductFormPreview;
