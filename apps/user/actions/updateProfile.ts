'use server'

export async function updateProfile(formData: FormData) {
  const nickname = formData.get('nickname')
  const intro = formData.get('introduction')
  const avatarFile = formData.get('avatar') as File

  console.log('nickname:', nickname)
  console.log('intro:', intro)
  console.log('avatarFile:', avatarFile?.name)

  // TODO: 업로드 처리, DB 저장 등 추가
}
