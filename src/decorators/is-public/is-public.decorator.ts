import { SetMetadata } from '@nestjs/common';

// helpers
import { IS_PUBLIC } from 'src/constants/common';

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
