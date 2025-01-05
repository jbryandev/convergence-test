import { revalidatePath, revalidateTag } from 'next/cache'

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateMap: CollectionAfterChangeHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/map')
    revalidateTag('pages-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/map')
    revalidateTag('pages-sitemap')
  }

  return doc
}
