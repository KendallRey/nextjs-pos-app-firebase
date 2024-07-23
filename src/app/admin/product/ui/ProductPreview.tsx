import MuiCard from "@/components/card/Card";
import MuiCardActionArea from "@/components/card/CardActionArea";
import MuiCardActions from "@/components/card/CardActions";
import MuiCardContent from "@/components/card/CardContent";
import MuiCardMedia from "@/components/card/CardMedia";
import MuiChip from "@/components/chip/Chip";
import { FIELDS } from "@/components/constants/config";
import { formatToCount, parseToMoney } from "@/components/helper/component";
import MuiStack from "@/components/stack/Stack";
import MuiTypography from "@/components/typography/Typograph";
import { useAppSelector } from "@/redux/services/hooks";
const ProductFormPreview = () => {
  const { error, ...form } = useAppSelector((state) => state.productFormSlice);

  return (
    <MuiCard sx={{ width: 345 }}>
      <MuiCardActionArea>
        <MuiCardMedia component="img" className="max-w-[240px] mx-auto p-4" image="/next.svg" />
        <MuiCardContent>
          <MuiStack direction="row" justifyContent="space-between" flexWrap="wrap">
            <MuiTypography gutterBottom variant="h5" component="div">
              {form.name || FIELDS.EMPTY_IMPORTANT}
            </MuiTypography>
            <MuiTypography gutterBottom variant="h6" component="div" className="text-end">
              {parseToMoney(form.price)}
            </MuiTypography>
          </MuiStack>
          <MuiStack spacing={1}>
            <MuiTypography variant="body2" color="text.secondary">
              {form.description || FIELDS.EMPTY}
            </MuiTypography>
            <MuiTypography variant="subtitle2" className="text-end">
              Stock: {formatToCount(form.stock)}
            </MuiTypography>
          </MuiStack>
        </MuiCardContent>
      </MuiCardActionArea>
      <MuiCardActions>
        <div className="flex flex-wrap gap-2">
          {form.categories?.map((item) => <MuiChip key={item.id} label={item.name} color="primary" />)}
        </div>
      </MuiCardActions>
    </MuiCard>
  );
};

export default ProductFormPreview;
