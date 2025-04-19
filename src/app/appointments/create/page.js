"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import * as Toast from '@radix-ui/react-toast';
import { format } from "date-fns";
import { cn } from "@/lib/utils"

const CreateAppointmentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    date: "",
    time: "",
    clientId: "",
    dni: "",
    address: "", 
    zone: "", 
  })

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const clientId = searchParams.get("clientId")
    const storedDni = sessionStorage.getItem("clientDni")

    if (clientId) {
      setFormData((prev) => ({ ...prev, clientId }))
    }

    if (storedDni) {
      setFormData((prev) => ({ ...prev, dni: storedDni }))
      sessionStorage.removeItem("clientDni")
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

    const handleDateChange = (date) => {
    // Validar que el valor de la fecha no sea nulo
    if (date instanceof Date && !isNaN(date.getTime())) {
      setFormData({ ...formData, date: date.toISOString().split("T")[0] }); // Guardar solo la parte de la fecha
    } else {
      console.error("Fecha no válida");
      alert("Por favor, selecciona una fecha válida.");
    }
  };
  
  const handleTimeChange = (e) => {
    const time = e.target.value;
    if (time) {
      setFormData({ ...formData, time });
    } else {
      console.error("Hora no válida");
      alert("Por favor, selecciona una hora válida.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.date || !formData.time) {
      console.error("Fecha u hora no válidas");
      alert("Por favor, selecciona una fecha y una hora válidas.");
      return;
    }

    const dateTime = new Date(`${formData.date}T${formData.time}:00`);
  
    if (isNaN(dateTime.getTime())) {
      console.error("Fecha u hora no válidas");
      alert("Por favor, selecciona una fecha y una hora válidas.");
      return;
    }
  
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: dateTime.toISOString(),
        }),
      });
    
      if (response.ok) {
        setFormData({
          title: "",
          type: "",
          description: "",
          date: "",
          time: "",
          address: "",
          zone: "",
          clientId: "",
          dni: "",
        });
        setToastMessage("Cita creada exitosamente!");
        setOpenToast(true);
        setTimeout(() => {
          router.push(`/`);
        }, 3000);
      } else {
        const errorData = await response.json();
        setToastMessage(`Error: ${errorData.error}`);
        setOpenToast(true);
      }
    } catch {
      setToastMessage("Error desconocido.");
      setOpenToast(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 gap-8">
      {/* Formulario */}
      <div className="w-full max-w-md bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Crear Nueva Cita
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Título *
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:flex-nowrap gap-4 md:gap-6">
            <div className="w-full md:w-auto">
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Cita *
              </label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger className="w-full md:w-[12rem] bg-gray-700 border-gray-600 text-gray-200 focus:ring-cyan-500 focus:ring-offset-gray-800">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectItem value="Spa">Spa</SelectItem>
                  <SelectItem value="Control Veterinario">Control Veterinario</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-300 mb-2">
                DNI del Cliente *
              </label>
              <Input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full md:w-[12rem] bg-gray-700 border-gray-600 text-gray-400"
                required
                readOnly
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
              Dirección *
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                Zona (mostradas en el mapa) *
              </label>
              <Select
                name="zone"
                value={formData.zone}
                onValueChange={(value) => setFormData({ ...formData, zone: value })}
                required
              >
                <SelectTrigger className="w-full md:w-[12rem] bg-gray-700 border-gray-600 text-gray-200 focus:ring-cyan-500 focus:ring-offset-gray-800">
                  <SelectValue placeholder="Seleccione una zona" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectItem value="Zona Pacocha Norte">Zona Pacocha Norte</SelectItem>
                  <SelectItem value="Zona Pacocha Sur">Zona Pacocha Sur</SelectItem>
                  <SelectItem value="Zona Miramar-Gerónimo">Zona Miramar-Gerónimo</SelectItem>
                  <SelectItem value="Zona Puerto">Zona Puerto</SelectItem>
                  <SelectItem value="Zona Alto Ilo">Zona Alto Ilo</SelectItem>
                  <SelectItem value="Zona Pampa Oeste">Zona Pampa Oeste</SelectItem>
                  <SelectItem value="Zona Pampa Este">Zona Pampa Este</SelectItem>
                  <SelectItem value="Zona Pampa Norte">Zona Pampa Norte</SelectItem>
                  <SelectItem value="Zona Pampa Sur">Zona Pampa Sur</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fecha *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200",
                      !formData.date && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span></span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                    className="bg-gray-800 text-gray-200"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Hora *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    {formData.time ? formData.time : <span className="text-gray-400">--:--</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 bg-gray-800 border-gray-700">
                  <div className="space-y-2">
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={handleTimeChange}
                      className="bg-gray-700 border-gray-600 text-gray-200"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Crear Cita
            </Button>
          </div>
        </form>
        <Toast.Provider duration={1500}>
          <Toast.Root
            open={openToast}
            onOpenChange={setOpenToast}
            duration={1500}
            className="bg-gray-800 border border-cyan-500/30 rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-right-8"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <Toast.Title className="font-medium text-cyan-400">
                  {toastMessage.includes('Error') ? 'Error' : 'Éxito'}
                </Toast.Title>
                <Toast.Description className="text-gray-300 mt-1">
                  {toastMessage}
                </Toast.Description>
              </div>
              <Toast.Close className="ml-4 text-gray-400 hover:text-gray-200">
                ×
              </Toast.Close>
            </div>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-full max-w-xs z-50" />
        </Toast.Provider>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-800/50 rounded-xl border border-gray-700 p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Ubicación en el Mapa (Referencial)</h2>
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=16ZHbxOq4aCNO1w-YwAUZYzk8KG-4Sxo&ehbc=2E312F"
          width="100%"
          height="400"
          className="border-0 rounded-lg shadow-lg mb-4"
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Leyenda de Zonas */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
          <h3 className="text-md font-medium text-gray-300 mb-3">Zonas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-zinc-950 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pacocha Norte</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-950 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pacocha Sur</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-lime-200 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Miramar-Gerónimo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Puerto</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Alto Ilo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Oeste</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Este</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Norte</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-900 mr-2"></div>
              <span className="text-sm text-gray-300">Zona Pampa Sur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AppointmentsCreatePage = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CreateAppointmentForm />
    </Suspense>
  )
}

export default AppointmentsCreatePage