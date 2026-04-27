'use client'

export function FieldInput({ label, placeholder, type = 'text', value, onChange }: {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <div className="mono" style={{ color: 'var(--mute)', marginBottom: 8 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input"
      />
    </label>
  )
}
