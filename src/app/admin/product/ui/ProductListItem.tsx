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
import { IProductPresentation } from "@/model/product/product-presentation";
import React from "react";

type IProductListItem = {
  item: IProductPresentation;
};

const ProducListItem: React.FC<IProductListItem> = ({ item }) => {
  return (
    <MuiCard>
      <MuiCardActionArea>
        <MuiCardMedia component="img" className="max-w-[240px] mx-auto p-4" image="/next.svg" />
        <MuiCardContent>
          <MuiStack direction="row" justifyContent="space-between" flexWrap="wrap">
            <MuiTypography gutterBottom variant="h5" component="div">
              {item.name || FIELDS.EMPTY_IMPORTANT}
            </MuiTypography>
            <MuiTypography gutterBottom variant="h6" component="div" className="text-end">
              {parseToMoney(item.price)}
            </MuiTypography>
          </MuiStack>
          <MuiStack spacing={1}>
            <MuiTypography variant="body2" color="text.secondary">
              {item.description || FIELDS.EMPTY}
            </MuiTypography>
            <MuiTypography variant="subtitle2" className="text-end">
              Stock: {formatToCount(item.stock)}
            </MuiTypography>
          </MuiStack>
        </MuiCardContent>
      </MuiCardActionArea>
      <MuiCardActions>
        <div className="flex flex-wrap gap-2">
          {item.categories?.map((item, i) => <MuiChip key={`${item}-${i}`} label={item} color="primary" />)}
        </div>
      </MuiCardActions>
    </MuiCard>
  );
};

export default ProducListItem;
