import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient(); // Cache'i yönetmek için queryClient'ı çağırıyoruz

  // 1. Veri Çekme İşlemi (useEffect ve useState yerine)
  const { data: contact, isLoading } = useQuery({
    queryKey: ['contact', contactId], // Her kişinin ID'sine göre ayrı önbellek
    queryFn: async () => {
      const res = await axios.get(
        `https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact/${contactId}`
      );
      return res.data;
    }
  });

  // 2. Silme İşlemi (useMutation)
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact/${contactId}`
      );
    },
    onSuccess: () => {
      // Silme başarılı olduğunda SideBar'daki listeyi yenilemesini söylüyoruz
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      // Ardından anasayfaya yönlendiriyoruz
      history.push("/");
    }
  });

  const handleDelete = () => {
    deleteMutation.mutate(); // Mutasyonu tetikler
  };

  if (isLoading) return "Yükleniyor...";
  if (!contact) return "Böyle bir kullanıcı yok";

  return (
    <div id="contact" className="max-w-2xl flex gap-8 items-center">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          className="w-48 h-48 bg-[#c8c8c8] rounded-3xl object-cover"
          alt="avatar"
        />
      </div>

      <div className="flex-1">
        <h1
          data-testid="full_name"
          className="text-3xl font-bold m-0 leading-tight"
        >
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.email && (
          <p className="m-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
        )}

        <div className="mt-6">
          <button 
            className="text-red-500" 
            onClick={handleDelete}
            disabled={deleteMutation.isPending} // Silinirken butonu devre dışı bırak
          >
            {deleteMutation.isPending ? "Siliniyor..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}