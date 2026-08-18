import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  FiBook,
  FiBookOpen,
  FiClipboard,
  FiDatabase,
  FiEdit,
  FiFileText,
  FiHome,
  FiPocket,
  FiSettings,
  FiShoppingCart,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineBookOpen, HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function NavItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link to={to}>
          {icon}
          {children}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function CollapsibleMenu({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Collapsible asChild defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {icon}
            <span>{label}</span>
            <HiOutlineChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>{children}</SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <Link to="/" className="flex h-20 flex-shrink-0 items-center gap-4">
            <img
              src="/images/logo-sipeka-full-long.svg"
              alt="Logo Atmaku"
              className={cn("block h-9")}
            />
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <FiHome /> Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <CollapsibleMenu label="Anggaran" icon={<FiEdit />}>
                <NavItem to="anggaran/rba/daftar-rab" icon={<FiClipboard />}>
                  Rencana Belanja
                </NavItem>
                <NavItem to="anggaran/rba/daftar-rap" icon={<FiClipboard />}>
                  Rencana Pendapatan
                </NavItem>
                <NavItem to="anggaran/rba/penyusunan-rba" icon={<FiEdit />}>
                  Penyusunan RBA
                </NavItem>
                <NavItem to="anggaran/dba/penetapan" icon={<FiFileText />}>
                  DBA
                </NavItem>
                <NavItem
                  to="anggaran/monitoring/realisasi-belanja"
                  icon={<FiBook />}
                >
                  Monitoring
                </NavItem>
              </CollapsibleMenu>

              <CollapsibleMenu label="Pendapatan" icon={<FiPocket />}>
                <NavItem to="pendapatan/perekaman" icon={<FiClipboard />}>
                  Rekam
                </NavItem>
              </CollapsibleMenu>

              <CollapsibleMenu label="Belanja" icon={<FiShoppingCart />}>
                <NavItem to="belanja/perekaman" icon={<FiClipboard />}>
                  Rekam
                </NavItem>
                <NavItem to="belanja/lpj-belanja" icon={<FiBook />}>
                  LPJ Belanja
                </NavItem>
                <NavItem to="belanja/spp" icon={<FiFileText />}>
                  SPP
                </NavItem>
                <NavItem to="belanja/spm" icon={<FiFileText />}>
                  SPM
                </NavItem>
                <NavItem to="belanja/sp2d" icon={<FiFileText />}>
                  SP2D
                </NavItem>
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuSubButton>
                        <FiBookOpen />
                        <span>Buku Bendahara</span>
                        <HiOutlineChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <NavItem to="belanja/buku/kas-umum">
                          Buku Kas Umum
                        </NavItem>
                        <NavItem to="belanja/buku/buku-pajak">
                          Buku Pajak
                        </NavItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuSubItem>
                </Collapsible>
              </CollapsibleMenu>

              <CollapsibleMenu label="Akuntansi" icon={<FiFileText />}>
                <NavItem to="akuntansi/rekening-koran" icon={<FiBook />}>
                  Rekening Koran
                </NavItem>
                <NavItem to="akuntansi/sp3b" icon={<FiFileText />}>
                  SP3B
                </NavItem>
                <NavItem to="akuntansi/lra" icon={<FiBook />}>
                  LRA
                </NavItem>
              </CollapsibleMenu>

              <CollapsibleMenu label="Lainnya" icon={<FiTool />}>
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuSubButton>
                        <FiDatabase />
                        <span>Database</span>
                        <HiOutlineChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <NavItem to="lainnya/database/unit-kerja">
                          Data Unit Kerja
                        </NavItem>
                        <NavItem to="lainnya/database/bank">Data Bank</NavItem>
                        <NavItem to="lainnya/database/rekanan">
                          Data Rekanan
                        </NavItem>
                        <NavItem to="lainnya/database/pegawai">
                          Data Pegawai
                        </NavItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuSubItem>
                </Collapsible>
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuSubButton>
                        <FiSettings />
                        <span>Pengaturan</span>
                        <HiOutlineChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <NavItem to="lainnya/pengaturan/profil-blud">
                          Profil BLUD
                        </NavItem>
                        <NavItem to="lainnya/pengaturan/pengelola-blud">
                          Pengelola BLUD
                        </NavItem>
                        <NavItem to="lainnya/pengaturan/rekening-bank">
                          Rekening Bank
                        </NavItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuSubItem>
                </Collapsible>
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuSubButton>
                        <FiBook />
                        <span>Referensi</span>
                        <HiOutlineChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <NavItem to="lainnya/referensi/kode-rekening/1">
                          Kode Rekening
                        </NavItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuSubItem>
                </Collapsible>
                <NavItem to="lainnya/user" icon={<FiUsers />}>
                  Manajemen User
                </NavItem>
              </CollapsibleMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link to="/panduan">
            <HiOutlineBookOpen /> Panduan Penggunaan
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}