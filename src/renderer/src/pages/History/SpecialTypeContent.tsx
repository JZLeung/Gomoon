import BaseFileIcon from '@renderer/assets/icon/file/baseFileIcon'
import { ContentMetaData } from '@renderer/lib/ai/parseString'

export default function (meta: ContentMetaData) {
  if (meta.type === 'file') {
    const filename = meta.src.split('/').pop()!
    return (
      <div class="flex cursor-pointer items-center duration-150">
        <span>我:</span>
        <BaseFileIcon class="pl-1" width={18} height={18} />
        <span>{filename}</span>
      </div>
    )
  }
  if (meta.type === 'url') {
    return (
      <a class="underline" href={meta.src} target="_blank" rel="noreferrer">
        {meta.src}
      </a>
    )
  }
  return null
}
