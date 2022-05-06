import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useMutateNote } from '../hooks/useMutateNote'
import useStore from '../store'
import { Note } from '../types/types'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spineer'

export const NoteItem: FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      <Link href={`/note/${id}`} prefetch={false}>
        <a className="cursor-pointer hover:text-pink-600">{title}</a>
      </Link>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                title: title,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoteMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}