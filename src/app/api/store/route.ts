import { createClient } from '@/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('posts').select('*')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: '데이터를 가져오는 데 실패했습니다.' })
  }
}

export async function POST(request: NextRequest) {
  console.log('🚀 ~ POST ~ request:', request)
  try {
    const info = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.from('posts').insert(info).select()

    if (error) {
      return alert(`${error.message}`)
    }
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: '게시물 등록에 실패했습니다.' })
  }
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json('')
}